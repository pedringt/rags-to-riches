export type RelationshipMetric = 'affection' | 'trust' | 'socialValue';

export type RelationshipState = {
  affection: number;
  trust: number;
  socialValue: number;
  tags: string[];
};

export type KnowledgeKind = 'fact' | 'evidence' | 'rumor' | 'publicNarrative';

export type KnowledgeItem = {
  id: string;
  kind: KnowledgeKind;
  claim: string;
  confidence: 'low' | 'medium' | 'high';
  public: boolean;
};

export type HistoryEvent = {
  id: string;
  day: number;
  note?: string;
};

export type AccessRoute = 'friend' | 'favor' | 'work' | null;

export type GameState = {
  saveVersion: 2;
  phase: 'prep' | 'event' | 'ending';
  sceneId: string;
  day: number;
  timeRemaining: number;
  cash: number;
  income: number;
  lifestyle: number;
  reputation: number;
  relevance: number;
  accessRoute: AccessRoute;
  relationships: Record<string, RelationshipState>;
  knowledge: KnowledgeItem[];
  history: HistoryEvent[];
};

export type Effect =
  | { type: 'cash'; amount: number }
  | { type: 'lifestyle'; amount: number }
  | { type: 'reputation'; amount: number }
  | { type: 'relevance'; amount: number }
  | { type: 'time'; amount: number }
  | { type: 'newWeek'; time: number }
  | { type: 'relationship'; characterId: string; metric: RelationshipMetric; amount: number }
  | { type: 'relationshipTag'; characterId: string; tag: string }
  | { type: 'history'; id: string; note?: string }
  | { type: 'knowledge'; item: KnowledgeItem }
  | { type: 'accessRoute'; route: Exclude<AccessRoute, null> };

export type Condition =
  | { type: 'minCash'; amount: number }
  | { type: 'minTime'; amount: number }
  | { type: 'history'; id: string }
  | { type: 'notHistory'; id: string }
  | { type: 'relationshipMin'; characterId: string; metric: RelationshipMetric; amount: number }
  | { type: 'knowledge'; id: string };

export type SceneChoice = {
  id: string;
  label: string;
  description?: string;
  nextSceneId: string;
  conditions?: Condition[];
  effects?: Effect[];
};

export type SceneVariant = {
  conditions: Condition[];
  body: string;
};

export type Scene = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  variants?: SceneVariant[];
  choices: SceneChoice[];
};
