import "./index.css"
import React, { useState } from "react";
import axios from "axios";

function SearchPlayer() {
    const [searchTerm, setSearchTerm] = useState("");
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedLeague, setSelectedLeague] = useState("39"); // Premier League como padrão
    const API_KEY = "fc96d29bba7816bda4fa5f4237c6af8b";

    // Lista de ligas populares
    const LEAGUES = [
        { id: 39, name: "Premier League (Inglaterra)" },
        { id: 140, name: "La Liga (Espanha)" },
        { id: 135, name: "Serie A (Itália)" },
        { id: 78, name: "Bundesliga (Alemanha)" },
        
    ];
    const formatRating = (rating) => {
        if (!rating) return '-';
        return parseFloat(rating).toFixed(2); // Converte para número e formata
      };

    const handleSearch = async () => {
        if (!searchTerm) return;

        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                `https://v3.football.api-sports.io/players?search=${encodeURIComponent(searchTerm)}&season=2023&league=${selectedLeague}`,
                {
                    headers: {
                        'x-apisports-key': API_KEY
                    }
                }
            );

            console.log("Resposta da API:", response.data);

            if (!response.data.response || response.data.response.length === 0) {
                setError(`Jogador não encontrado na ${LEAGUES.find(l => l.id == selectedLeague)?.name}`);
                setPlayerData(null);
                return;
            }

            const activePlayers = response.data.response.filter(player => 
                player.statistics?.[0]?.games?.appearences > 0
            );

            if (activePlayers.length === 0) {
                setError("Jogador não atuou nesta liga/temporada");
                return;
            }

            const bestMatch = activePlayers[0];
            setPlayerData({
                ...bestMatch.player,
                statistics: bestMatch.statistics[0],
                team: bestMatch.statistics[0].team
            });

        } catch (err) {
            console.error("Erro:", err.response?.data || err);
            setError(err.response?.data?.errors?.plan || "Erro na conexão");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
             <div className='h-100 w-full flex flex-col items-center justify-center'>
                <img src="/futseek-logo.png" alt="Logo do aplicativo" className='w-70 h-70' />
                <h4 className='text-center  text-xl mt-7 mb-10 '>Pesquise informações essenciais sobre os jogadores de todo o mundo </h4>
            </div>
            <div className="max-w-2xl mx-auto px-4">
                {/* Área de Busca */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 space-y-4">
                    <div className="flex gap-2">
                        <select
                            value={selectedLeague}
                            onChange={(e) => setSelectedLeague(e.target.value)}
                            className="px-4 py-2 border border-[#35A369] rounded-lg bg-white"
                        >
                            {LEAGUES.map(league => (
                                <option key={league.id} value={league.id}>
                                    {league.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Digite o nome do jogador..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full h-12 rounded-2xl bg-white border border-[#35A369] pl-5 pr-10 focus:outline-none"
                           
                        />

                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="px-8 py-3 bg-[#35A369] hover:bg-green-800 text-white transition-colors cursor-pointer rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>

                </div>

                {/* Mensagens de Erro */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Card do Jogador */}
                {playerData && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-[#35A369] p-6">
                            <h1 className="text-2xl font-bold text-white">{playerData.name}</h1>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                                <img 
                                    src={playerData.photo} 
                                    alt={playerData.name}
                                    className="w-32 h-32 rounded-full border-4 border-blue-100"
                                />
                                <div className="space-y-2">
                                    <p><span className="font-semibold">Idade:</span> {playerData.age}</p>
                                    <p><span className="font-semibold">Nacionalidade:</span> {playerData.nationality}</p>
                                    <p><span className="font-semibold">Time:</span> {playerData.team?.name}</p>
                                    <p><span className="font-semibold">Posição:</span> {playerData.statistics.games.position}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Jogos 👟</p>
                                    <p className="text-2xl font-bold">{playerData.statistics.games.appearences}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Gols ⚽</p>
                                    <p className="text-2xl font-bold">{playerData.statistics.goals.total}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Assistências 🤜🤛</p>
                                    <p className="text-2xl font-bold">{playerData.statistics.goals.assists || 0}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Cartões Amarelos 🟨</p>
                                    <p className="text-2xl font-bold">{playerData.statistics.cards.yellow}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Cartões Vermelhos 🟥</p>
                                    <p className="text-2xl font-bold">{playerData.statistics.cards.red}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Nota Média</p>
                                    <p className="text-2xl font-bold">{formatRating(playerData.statistics.games.rating)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPlayer;