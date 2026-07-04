import { memo, useEffect, useMemo, useState } from 'react';
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
  type ReactFlowInstance
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './Atlas.css';
import {
  domainCards,
  edges as atlasEdges,
  laneMeta,
  nodes as atlasNodes,
  relationshipLabels,
  type AtlasEdge,
  type AtlasNode,
  type Lane,
  type NodeKind
} from '../data/atlas';

type ReadingMode = 'beginner' | 'expert';
type View = 'atlas' | 'domains' | 'story';
type Focus = 'all' | 'spine';

type AtlasFlowNode = Node<{ atlas: AtlasNode }, 'atlasNode'>;

type AtlasNodeProps = {
  data: { atlas: AtlasNode };
  selected: boolean;
};

const kindLabels: Record<NodeKind, string> = {
  primary: 'Primary inheritance',
  contributing: 'Contributing influence',
  revision: 'Institutional revision',
  retrieval: 'Later retrieval',
  institution: 'Institutional development',
  question: 'Present question'
};

const kindShortLabels: Record<NodeKind, string> = {
  primary: 'Spine',
  contributing: 'Input',
  revision: 'Revision',
  retrieval: 'Retrieval',
  institution: 'Institution',
  question: 'Question'
};

const AtlasNodeCard = memo(({ data, selected }: AtlasNodeProps) => {
  const item = data.atlas;
  return (
    <article className={`atlas-node kind-${item.kind} ${selected ? 'is-selected' : ''}`} aria-label={`${item.title}, ${item.date}`}>
      <Handle type="target" position={Position.Left} className="atlas-handle atlas-handle-left" />
      <div className="node-kicker">
        <span>{kindShortLabels[item.kind]}</span>
        <span>{item.date}</span>
      </div>
      <h3>{item.shortTitle ?? item.title}</h3>
      <p>{item.contribution}</p>
      <Handle type="source" position={Position.Right} className="atlas-handle atlas-handle-right" />
    </article>
  );
});

const nodeTypes = { atlasNode: AtlasNodeCard };

function isPrimarySpineNode(node: AtlasNode) {
  return ['primary', 'institution', 'revision', 'question'].includes(node.kind);
}

function buildFlowNodes(items: AtlasNode[], focus: Focus, lane: Lane | 'All', selectedId: string | null): AtlasFlowNode[] {
  return items.map((item) => {
    const dimmed = (focus === 'spine' && !isPrimarySpineNode(item)) || (lane !== 'All' && item.lane !== lane);
    return {
      id: item.id,
      type: 'atlasNode',
      position: item.position,
      data: { atlas: item },
      selectable: true,
      selected: item.id === selectedId,
      draggable: false,
      className: dimmed ? 'flow-node-dimmed' : ''
    };
  });
}

function buildFlowEdges(items: AtlasEdge[], focus: Focus, lane: Lane | 'All'): Edge[] {
  const itemById = new Map(atlasNodes.map((item) => [item.id, item]));
  return items.map((edge) => {
    const source = itemById.get(edge.source);
    const target = itemById.get(edge.target);
    const dimmed =
      (focus === 'spine' && (!source || !target || !isPrimarySpineNode(source) || !isPrimarySpineNode(target))) ||
      (lane !== 'All' && source?.lane !== lane && target?.lane !== lane);

    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: false,
      label: edge.label,
      labelStyle: { fill: '#31474a', fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: '#f4efe6', fillOpacity: 0.9 },
      labelBgPadding: [3, 5],
      markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
      className: `flow-edge edge-${edge.kind} ${dimmed ? 'flow-edge-dimmed' : ''}`
    };
  });
}

function SourceList({ node }: { node: AtlasNode }) {
  return (
    <section className="source-section" aria-labelledby="source-heading">
      <h3 id="source-heading">Sources to inspect</h3>
      <p className="source-note">Primary texts and authoritative editions are linked where available. Verify editorial claims against the cited material before publication.</p>
      <ul className="source-list">
        {node.sources.map((source) => (
          <li key={`${source.title}-${source.url}`}>
            <a href={source.url} target="_blank" rel="noreferrer">
              <span>{source.title}</span>
              <small>{[source.author, source.year].filter(Boolean).join(' · ')}</small>
            </a>
            {source.note ? <p>{source.note}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function NodeDrawer({ node, mode, onClose, onJump }: { node: AtlasNode; mode: ReadingMode; onClose: () => void; onJump: (id: string) => void }) {
  const related = atlasEdges
    .filter((edge) => edge.source === node.id || edge.target === node.id)
    .map((edge) => {
      const connectedId = edge.source === node.id ? edge.target : edge.source;
      return { edge, node: atlasNodes.find((item) => item.id === connectedId) };
    })
    .filter((item): item is { edge: AtlasEdge; node: AtlasNode } => Boolean(item.node));

  return (
    <aside className="node-drawer" aria-live="polite" aria-label={`Details for ${node.title}`}>
      <button type="button" className="drawer-close" onClick={onClose} aria-label="Close details">×</button>
      <div className={`drawer-kind kind-${node.kind}`}>{kindLabels[node.kind]}</div>
      <p className="drawer-date">{node.date} · {node.lane}</p>
      <h2>{node.title}</h2>
      <p className="drawer-lede">{mode === 'beginner' ? node.beginner : node.expert}</p>
      {mode === 'beginner' ? <p className="drawer-context"><strong>Why it matters:</strong> {node.contribution}</p> : null}
      <div className="tag-list" aria-label="Topics">
        {node.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <SourceList node={node} />
      <section className="related-section">
        <h3>Connected ideas</h3>
        <ul>
          {related.map(({ edge, node: relatedNode }) => (
            <li key={`${edge.id}-${relatedNode.id}`}>
              <button type="button" onClick={() => onJump(relatedNode.id)}>
                <span>{relatedNode.shortTitle ?? relatedNode.title}</span>
                <small>{relationshipLabels[edge.kind]}{edge.label ? ` · ${edge.label}` : ''}</small>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

function DomainsView({ mode, onSelect }: { mode: ReadingMode; onSelect: (id: string) => void }) {
  return (
    <section className="domains-view" aria-labelledby="domains-title">
      <div className="section-intro">
        <p className="eyebrow">Conceptual map</p>
        <h2 id="domains-title">Who governs what?</h2>
        <p>
          The central issue is not whether civil government exists. It is whether one institution may absorb the duties that belong to conscience, household, church, voluntary association, and local community.
        </p>
      </div>
      <div className="domains-grid">
        {domainCards.map((domain, index) => (
          <article className="domain-card" key={domain.title}>
            <div className="domain-number">0{index + 1}</div>
            <h3>{domain.title}</h3>
            <p className="domain-question">{domain.question}</p>
            <p>{domain.summary}</p>
            <div className="domain-examples">
              {domain.examples.map((example) => <span key={example}>{example}</span>)}
            </div>
            <div className="domain-links">
              {domain.related.map((id) => {
                const node = atlasNodes.find((item) => item.id === id);
                return node ? <button type="button" key={id} onClick={() => onSelect(id)}>{node.shortTitle ?? node.title} →</button> : null;
              })}
            </div>
          </article>
        ))}
      </div>
      <article className="domains-note">
        <h3>{mode === 'beginner' ? 'A first principle' : 'Analytical framing'}</h3>
        <p>
          {mode === 'beginner'
            ? 'The atlas follows a recurring question: when a ruler, agency, party, court, or institution claims a new power, what older responsibility does it displace?'
            : 'This is a conceptual overlay, not a claim that every historical figure used the same taxonomy. It lets visitors compare traditions that named the problem differently: jurisdictions, two powers, estates, associations, subsidiarity, sphere sovereignty, federalism, and intermediary institutions.'}
        </p>
      </article>
    </section>
  );
}

function StoryView({ mode, onSelect }: { mode: ReadingMode; onSelect: (id: string) => void }) {
  const spine = atlasNodes.filter((node) => isPrimarySpineNode(node));
  return (
    <section className="story-view" aria-labelledby="story-title">
      <div className="section-intro story-intro">
        <p className="eyebrow">Guided route</p>
        <h2 id="story-title">A lineage of limits on power</h2>
        <p>Read the primary route as a sequence. Open any stop to inspect parallel influences, revisions, and later retrievals.</p>
      </div>
      <ol className="story-list">
        {spine.map((node, index) => (
          <li key={node.id}>
            <div className="story-marker">{String(index + 1).padStart(2, '0')}</div>
            <article>
              <p className="story-date">{node.date} · {node.lane}</p>
              <h3>{node.title}</h3>
              <p>{mode === 'beginner' ? node.beginner : node.expert}</p>
              <button type="button" onClick={() => onSelect(node.id)}>Open sources and connections →</button>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Atlas() {
  const [view, setView] = useState<View>('atlas');
  const [mode, setMode] = useState<ReadingMode>('beginner');
  const [focus, setFocus] = useState<Focus>('all');
  const [lane, setLane] = useState<Lane | 'All'>('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>('old-testament');
  const [flow, setFlow] = useState<ReactFlowInstance<AtlasFlowNode, Edge> | null>(null);

  const flowNodes = useMemo(() => buildFlowNodes(atlasNodes, focus, lane, selectedId), [focus, lane, selectedId]);
  const flowEdges = useMemo(() => buildFlowEdges(atlasEdges, focus, lane), [focus, lane]);
  const selectedNode = atlasNodes.find((node) => node.id === selectedId) ?? null;

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return atlasNodes.filter((node) => {
      const corpus = [node.title, node.date, node.lane, node.contribution, ...node.tags].join(' ').toLowerCase();
      return corpus.includes(normalized);
    }).slice(0, 6);
  }, [query]);

  const focusNode = (id: string) => {
    setSelectedId(id);
    setView('atlas');
    const node = atlasNodes.find((item) => item.id === id);
    if (node && flow) {
      flow.setCenter(node.position.x + 115, node.position.y + 60, { zoom: 0.82, duration: 420 });
    }
  };

  const onNodeClick: NodeMouseHandler<AtlasFlowNode> = (_, node) => {
    focusNode(node.id);
  };

  useEffect(() => {
    if (view === 'atlas' && flow) {
      window.setTimeout(() => flow.fitView({ padding: 0.13, minZoom: 0.28, maxZoom: 0.75, duration: 300 }), 80);
    }
  }, [view, flow]);

  return (
    <main className="atlas-app">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="The Limits of Power home">
          <span className="wordmark-mark">LP</span>
          <span>
            <strong>The Limits of Power</strong>
            <small>A historical atlas of authority, conscience, and civil government</small>
          </span>
        </a>
        <div className="header-controls">
          <div className="mode-switch" aria-label="Reading depth">
            <button type="button" className={mode === 'beginner' ? 'active' : ''} onClick={() => setMode('beginner')}>Begin here</button>
            <button type="button" className={mode === 'expert' ? 'active' : ''} onClick={() => setMode('expert')}>Go deeper</button>
          </div>
          <a className="about-link" href="#method">Method</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Interactive historical atlas</p>
          <h1>Where does political power end?</h1>
          <p className="hero-text">
            Trace a real historical line of thought: law above rulers, differentiated authority, church and civil jurisdiction, local self-government, constitutional restraint, and the modern danger of institutions that absorb all the rest.
          </p>
          <div className="hero-cards" aria-label="Atlas scope">
            <span><b>{atlasNodes.length}</b> curated stops</span>
            <span><b>6</b> historical streams</span>
            <span><b>5</b> relationship types</span>
          </div>
        </div>
        <aside className="hero-principle">
          <p>Central question</p>
          <blockquote>
            “When political authority expands, which older duty, right, or institution does it displace?”
          </blockquote>
          <span>Explore the lineage, the institutions, and the later retrievals.</span>
        </aside>
      </section>

      <nav className="view-tabs" aria-label="Atlas views">
        <button type="button" className={view === 'atlas' ? 'active' : ''} onClick={() => setView('atlas')}>Historical atlas</button>
        <button type="button" className={view === 'domains' ? 'active' : ''} onClick={() => setView('domains')}>Who governs what?</button>
        <button type="button" className={view === 'story' ? 'active' : ''} onClick={() => setView('story')}>Guided route</button>
      </nav>

      {view === 'atlas' ? (
        <section className="atlas-workspace" aria-label="Interactive historical atlas">
          <aside className="atlas-sidebar">
            <div>
              <p className="eyebrow">Navigate</p>
              <h2>Follow the main line. Open the branches.</h2>
              <p className="sidebar-copy">The solid spine follows a primary inheritance claim. Lighter lines mark contributing influences, institutional developments, revisions, and later retrievals.</p>
            </div>
            <label className="search-box">
              <span>Search the atlas</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Westminster, family, law" />
              {searchResults.length ? (
                <ul className="search-results">
                  {searchResults.map((node) => (
                    <li key={node.id}><button type="button" onClick={() => { focusNode(node.id); setQuery(''); }}>{node.title}<small>{node.date}</small></button></li>
                  ))}
                </ul>
              ) : null}
            </label>
            <div className="control-group">
              <span className="control-label">Emphasis</span>
              <div className="chip-row">
                <button type="button" className={focus === 'all' ? 'selected' : ''} onClick={() => setFocus('all')}>All streams</button>
                <button type="button" className={focus === 'spine' ? 'selected' : ''} onClick={() => setFocus('spine')}>Primary spine</button>
              </div>
            </div>
            <div className="control-group">
              <span className="control-label">Historical stream</span>
              <select value={lane} onChange={(event) => setLane(event.target.value as Lane | 'All')}>
                <option value="All">All streams</option>
                {Object.entries(laneMeta).sort((a, b) => a[1].order - b[1].order).map(([name]) => <option value={name} key={name}>{name}</option>)}
              </select>
            </div>
            <div className="legend" aria-label="Map legend">
              <span><i className="legend-line line-primary" />Primary inheritance</span>
              <span><i className="legend-line line-contributing" />Contributing influence</span>
              <span><i className="legend-line line-revision" />Institutional revision</span>
              <span><i className="legend-line line-retrieval" />Later retrieval</span>
              <span><i className="legend-line line-institutional" />Institutional development</span>
            </div>
            <button type="button" className="fit-button" onClick={() => flow?.fitView({ padding: 0.13, minZoom: 0.28, maxZoom: 0.75, duration: 320 })}>Fit whole atlas</button>
          </aside>

          <div className="map-shell">
            <div className="map-topline">
              <div><span>Time flows left → right</span><b>Curated positions; not an automatic tree</b></div>
              <div className="map-help">Click a node to open texts and connections.</div>
            </div>
            <ReactFlow<AtlasFlowNode, Edge>
              nodes={flowNodes}
              edges={flowEdges}
              nodeTypes={nodeTypes}
              onInit={setFlow}
              onNodeClick={onNodeClick}
              nodesDraggable={false}
              nodesConnectable={false}
              edgesFocusable
              elementsSelectable
              minZoom={0.22}
              maxZoom={1.35}
              fitView
              fitViewOptions={{ padding: 0.13, minZoom: 0.28, maxZoom: 0.75 }}
              proOptions={{ hideAttribution: true }}
              aria-label="Historical map of ideas about political power"
            >
              <Background gap={28} size={1} color="#d4ccc0" />
              <Controls showInteractive={false} position="bottom-right" />
            </ReactFlow>
          </div>

          {selectedNode ? <NodeDrawer node={selectedNode} mode={mode} onClose={() => setSelectedId(null)} onJump={focusNode} /> : null}
        </section>
      ) : null}

      {view === 'domains' ? <DomainsView mode={mode} onSelect={focusNode} /> : null}
      {view === 'story' ? <StoryView mode={mode} onSelect={focusNode} /> : null}

      <section className="method-section" id="method">
        <div>
          <p className="eyebrow">Method</p>
          <h2>This atlas distinguishes inheritance from influence.</h2>
        </div>
        <div className="method-grid">
          <article><h3>Primary inheritance</h3><p>A later tradition consciously receives and develops an earlier stream.</p></article>
          <article><h3>Contributing influence</h3><p>A text or movement supplies vocabulary, arguments, legal technique, or institutions without being the sole cause.</p></article>
          <article><h3>Institutional revision</h3><p>A constitution, confession, statute, or public settlement materially changes the inherited formulation.</p></article>
          <article><h3>Later retrieval</h3><p>A modern thinker revives, extends, rearranges, or contests part of an older inheritance.</p></article>
        </div>
        <p className="method-note">The site is deliberately not a claim that every person in this map agreed, that the United States perfectly embodied its professed ideals, or that every later branch is equally representative. It is a curated starting framework for source-based inquiry.</p>
      </section>

      <footer className="site-footer">
        <span>The Limits of Power · starter atlas</span>
        <span>Built for cited expansion, translation, and review.</span>
      </footer>
    </main>
  );
}
