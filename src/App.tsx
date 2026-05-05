import { useState, useMemo } from 'react'

// Interfaccia per i modelli IA
interface AIModel {
  id: string
  name: string
  creator: string
  category: 'LLM' | 'Coding' | 'Immagini' | 'Ricerca' | 'Siti Web' | 'CV' | 'Design' | 'Copywriting' | 'Video' | 'Audio'
  extraCategories?: Array<'LLM' | 'Coding' | 'Immagini' | 'Ricerca' | 'Siti Web' | 'CV' | 'Design' | 'Copywriting' | 'Video' | 'Audio'>
  url: string
  strengths: string
  description: string
  color: string
}

// Database dei modelli IA
const aiModels: AIModel[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    creator: 'OpenAI',
    category: 'LLM',
    url: 'https://chatgpt.com',
    strengths: 'Tuttofare per assistenza generale, scrittura e logica',
    description: 'Il modello più versatile e affidabile del mercato. Eccellente per coding, copywriting e problem-solving in generale.',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    creator: 'Google',
    category: 'LLM',
    url: 'https://gemini.google.com',
    strengths: 'Integrazione ecosistema Google, analisi di enormi dataset (context window)',
    description: 'Leader per l\'analisi di documenti lunghissimi e l\'integrazione con strumenti Google.',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'claude',
    name: 'Claude',
    creator: 'Anthropic',
    category: 'LLM',
    extraCategories: ['Coding'],
    url: 'https://claude.ai',
    strengths: 'Programmazione, scrittura creativa e tono quasi umano',
    description: 'Superiore per coding complesso, scrittura sfumata e conversazioni naturali. Context window eccezionale.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'kimi',
    name: 'Kimi k2.5',
    creator: 'Moonshot AI',
    category: 'LLM',
    url: 'https://kimi.moonshot.cn',
    strengths: 'Elaborazione di documenti lunghissimi e ragionamento avanzato',
    description: 'Specialista nel processare testi enormi (fino a 200k token). Perfetto per ricerca e analisi approfondita.',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek v3',
    creator: 'DeepSeek',
    category: 'LLM',
    url: 'https://chat.deepseek.com',
    strengths: 'Efficienza nel coding e logica di alto livello a costi ridotti',
    description: 'Miglior rapporto qualità-prezzo. Eccellente per algoritmi complessi e ottimizzazione del codice.',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'qwen',
    name: 'Qwen 2.5-Max',
    creator: 'Alibaba',
    category: 'LLM',
    url: 'https://qwenlm.github.io/blog/qwen2.5/',
    strengths: 'Compiti multilingua e problemi matematici complessi',
    description: 'Potentissimo per lingue non-latine e calcoli matematici avanzati. Eccellente multilinguismo.',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    creator: 'Anysphere',
    category: 'Coding',
    url: 'https://www.cursor.com',
    strengths: 'IDE AI-native per sviluppo rapido, refactor e codebase awareness',
    description: 'Editor orientato al coding con assistenza contestuale profonda, ottimo per produttivita su progetti grandi.',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    creator: 'Codeium',
    category: 'Coding',
    url: 'https://windsurf.com',
    strengths: 'Flusso di sviluppo assistito end-to-end con forte integrazione agente',
    description: 'Ambiente di sviluppo con automazioni AI per scrittura, modifica e navigazione del codice in modo guidato.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    creator: 'Midjourney Inc.',
    category: 'Immagini',
    url: 'https://www.midjourney.com',
    strengths: 'La vetta qualitativa per immagini artistiche e controllo estetico',
    description: 'Leader assoluto per immagini artistiche. Controllo stilistico preciso e risultati sempre coerenti.',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'flux',
    name: 'Flux.1',
    creator: 'Black Forest Labs',
    category: 'Immagini',
    url: 'https://blackforestlabs.ai',
    strengths: 'Realismo fotografico e precisione nel rendering di testo nelle immagini',
    description: 'Il nuovo standard per fotorealismo e testo. Perfetto per contenuti commerciali e foto-realistic.',
    color: 'from-cyan-500 to-teal-600'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    creator: 'Perplexity',
    category: 'Ricerca',
    url: 'https://www.perplexity.ai',
    strengths: 'Ricerca web in tempo reale con fonti citate e sintesi affidabili',
    description: 'Ideale per ricerca veloce, verifica delle fonti e risposte aggiornate su eventi recenti.',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'durable',
    name: 'Durable',
    creator: 'Durable',
    category: 'Siti Web',
    url: 'https://www.durable.co',
    strengths: 'Crea siti web completi in secondi senza coding',
    description: 'Builder di siti web con AI che genera il tuo sito automaticamente. Perfetto per piccole imprese e freelancer.',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'kickresume',
    name: 'Kickresume',
    creator: 'Kickresume',
    category: 'CV',
    url: 'https://www.kickresume.com',
    strengths: 'Genera CV e cover letter professionali con AI',
    description: 'Assistente AI per creare CV impeccabili, cover letter e portfolio. Aumenta le probabilità di essere assunti.',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'canva',
    name: 'Canva',
    creator: 'Canva',
    category: 'Design',
    url: 'https://www.canva.com',
    strengths: 'Design velocissimo con template AI per ogni esigenza',
    description: 'Strumento di design intuitivo con AI che ti suggerisce layout e colori. Milioni di template pronti.',
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    creator: 'ElevenLabs',
    category: 'Audio',
    url: 'https://elevenlabs.io',
    strengths: 'Sintesi vocale naturalissima e clonazione voce di alta qualità',
    description: 'Genera voce narrante perfetta da testo. Ideale per podcast, video, audiobook e locuzione professionale.',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    creator: 'Synthesia',
    category: 'Video',
    url: 'https://www.synthesia.io',
    strengths: 'Crea video con avatar AI da testo in pochi minuti',
    description: 'Genera video professionali con avatar AI senza telecamera. Perfetto per training, marketing e comunicazione aziendale.',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'copyai',
    name: 'Copy.ai',
    creator: 'Copy.ai',
    category: 'Copywriting',
    url: 'https://www.copy.ai',
    strengths: 'Genera copy persuasivo per email, annunci e landing page',
    description: 'Assistente AI per copywriting veloce. Crea testi di vendita, slogan e contenuti marketing in secondi.',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    creator: 'GitHub/OpenAI',
    category: 'Coding',
    extraCategories: ['LLM'],
    url: 'https://github.com/features/copilot',
    strengths: 'Completamento di codice contestuale dentro l\'IDE',
    description: 'Assistente di coding integrato direttamente nell\'editor. Suggerisce intere funzioni e snippet di codice in tempo reale.',
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'replit',
    name: 'Replit Ghostwriter',
    creator: 'Replit',
    category: 'Coding',
    url: 'https://replit.com',
    strengths: 'IDE cloud con AI integrato per prototipazione veloce',
    description: 'Ambiente di sviluppo completo nel browser con assistenza AI. Perfetto per learning e prototipi.',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'tavily',
    name: 'Tavily',
    creator: 'Tavily',
    category: 'Ricerca',
    url: 'https://tavily.com',
    strengths: 'Motore di ricerca API con risultati ottimizzati per IA',
    description: 'Ricerca web specializzata per modelli AI e agenti autonomi. Risultati accurati e veloci.',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'zoer',
    name: 'Zoer',
    creator: 'Zoer',
    category: 'Siti Web',
    url: 'https://zoer.ai',
    strengths: 'Generazione full-stack (frontend, backend, database) da prompt in linguaggio naturale',
    description: 'Crea web app complete partendo da una sola descrizione testuale. Genera automaticamente schema del database, API REST e interfaccia React, senza scrivere codice.',
    color: 'from-yellow-400 to-orange-700'
  }
]

// Componente Card per singolo modello
interface AICardProps {
  model: AIModel
}

function AICard({ model }: AICardProps) {
  return (
    <div className="group glass rounded-2xl p-6 h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Sfondo gradiente decorativo */}
      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${model.color} opacity-10 rounded-full blur-3xl transition-opacity group-hover:opacity-20`}></div>
      
      <div className="relative z-10">
        {/* Header con badge categoria */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
            <p className="text-sm text-gray-400">{model.creator}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${model.color}`}>
            {model.category}
          </span>
        </div>

        {/* Descrizione */}
        <p className="text-sm text-gray-300 mb-4">{model.description}</p>

        {/* Punto di forza */}
        <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">💡 Ideale per:</p>
          <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
            {model.strengths}
          </p>
        </div>
      </div>

      {/* Footer con link */}
      <a
        href={model.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 no-underline cursor-pointer transition-colors duration-300"
      >
        <span className="text-xs text-gray-500 group-hover:text-gray-300">Visita il sito</span>
        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    </div>
  )
}

// Componente principale App
function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'LLM' | 'Coding' | 'Immagini' | 'Ricerca' | 'Siti Web' | 'CV' | 'Design' | 'Copywriting' | 'Video' | 'Audio'>('All')

  // Filtro e ricerca
  const filteredModels = useMemo(() => {
    return aiModels.filter(model => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.strengths.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' ||
        model.category === selectedCategory ||
        model.extraCategories?.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark/95 px-4 py-12">
      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Container principale */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            AI <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-transparent bg-clip-text">Directory</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Scopri i modelli di IA più potenti al mondo. Una selezione curata dei migliori tool per ogni esigenza.
          </p>
        </div>

        {/* Barra di ricerca */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cerca per nome, creator o specialità..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-xl glass text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Filtri categoria */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {(['All', 'LLM', 'Coding', 'Immagini', 'Ricerca', 'Siti Web', 'CV', 'Design', 'Copywriting', 'Video', 'Audio'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Griglia di modelli */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => <AICard key={model.id} model={model} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">Nessun modello trovato. Prova a cercare qualcos'altro.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center border-t border-white/10 pt-8">
          <p className="text-gray-500 text-sm">
            Ultima aggiornamento: {new Date().toLocaleDateString('it-IT')} • Selezionati {filteredModels.length} di {aiModels.length} modelli
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
