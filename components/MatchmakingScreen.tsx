import React, { useState } from 'react';
import { MatchmakingResults, Torneo, Cuerda, Pelea, Gallo } from '../types';
import { PrinterIcon } from './Icons';

interface MatchmakingScreenProps {
    results: MatchmakingResults;
    torneo: Torneo;
    cuerdas: Cuerda[];
    gallos: Gallo[];
    onStartTournament: () => void;
    onBack: () => void;
    onCreateManualFight: (roosterAId: string, roosterBId: string) => void;
    isReadOnly: boolean;
}

const MatchmakingScreen: React.FC<MatchmakingScreenProps> = ({ results, torneo, cuerdas, onStartTournament, onBack, onCreateManualFight, isReadOnly }) => {
    
    const getCuerdaName = (id: string) => cuerdas.find(p => p.id === id)?.name || 'Desconocido';

    const formatWeight = (totalOunces: number): string => {
        const lbs = Math.floor(totalOunces / 16);
        const oz = Math.round(totalOunces % 16);
        return `${lbs}.${String(oz).padStart(2, '0')}`;
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            {/* --- ESTA ES LA TABLA QUE LEE LA IMPRESORA --- */}
            <div id="printable-programming" style={{ color: 'black' }}>
                <div className="report-title">{torneo.name}</div>
                <div className="report-subtitle">PROGRAMACIÓN DE PELEAS - FECHA: {torneo.date}</div>
                
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2}>N°</th>
                            <th colSpan={8}>GALLO A (ROJA)</th>
                            <th className="vs-cell" rowSpan={2}>VS</th>
                            <th colSpan={8}>GALLO B (AZUL)</th>
                        </tr>
                        <tr>
                            <th>CUERDA</th>
                            <th>ANILLO</th>
                            <th>PM</th>
                            <th>PC</th>
                            <th>COLOR</th>
                            <th>FENOTIPO</th>
                            <th>TIPO</th>
                            <th>PESO</th>
                            <th>CUERDA</th>
                            <th>ANILLO</th>
                            <th>PM</th>
                            <th>PC</th>
                            <th>COLOR</th>
                            <th>FENOTIPO</th>
                            <th>TIPO</th>
                            <th>PESO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.mainFights.map((pelea, index) => (
                            <tr key={pelea.id}>
                                <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                {/* Datos Gallo A */}
                                <td className="cuerda-name">{getCuerdaName(pelea.roosterA.cuerdaId)}</td>
                                <td>{pelea.roosterA.ringId}</td>
                                <td>{pelea.roosterA.markingId}</td>
                                <td>{pelea.roosterA.breederPlateId}</td>
                                <td>{pelea.roosterA.color}</td>
                                <td>{pelea.roosterA.tipoGallo}</td>
                                <td>{pelea.roosterA.tipoEdad}</td>
                                <td>{formatWeight(pelea.roosterA.weight)}</td>

                                <td className="vs-cell">VS</td>

                                {/* Datos Gallo B */}
                                <td className="cuerda-name">{getCuerdaName(pelea.roosterB.cuerdaId)}</td>
                                <td>{pelea.roosterB.ringId}</td>
                                <td>{pelea.roosterB.markingId}</td>
                                <td>{pelea.roosterB.breederPlateId}</td>
                                <td>{pelea.roosterB.color}</td>
                                <td>{pelea.roosterB.tipoGallo}</td>
                                <td>{pelea.roosterB.tipoEdad}</td>
                                <td>{formatWeight(pelea.roosterB.weight)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '10px', fontSize: '8pt', textAlign: 'right' }}>
                    Total de peleas: {results.mainFights.length}
                </div>
            </div>

            {/* --- ESTO ES LO QUE VES EN EL CELULAR/PC (NO SE IMPRIME) --- */}
            <div className="no-print text-center">
                <h2 className="text-3xl font-bold text-white">Cartelera del Día</h2>
                <button 
                    onClick={handlePrint}
                    className="mt-4 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl mx-auto shadow-lg"
                >
                    <PrinterIcon className="w-6 h-6" />
                    <span>IMPRIMIR PROGRAMACIÓN (A4)</span>
                </button>
            </div>

            <div className="space-y-3 no-print">
                {results.mainFights.map(p => (
                    <div key={p.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                        <span className="text-amber-500 font-bold">#{p.fightNumber}</span>
                        <div className="text-right flex-1 px-2">
                            <div className="text-white font-semibold truncate">{getCuerdaName(p.roosterA.cuerdaId)}</div>
                            <div className="text-xs text-gray-400">{p.roosterA.color} ({formatWeight(p.roosterA.weight)})</div>
                        </div>
                        <div className="px-4 text-red-500 font-black">VS</div>
                        <div className="text-left flex-1 px-2">
                            <div className="text-white font-semibold truncate">{getCuerdaName(p.roosterB.cuerdaId)}</div>
                            <div className="text-xs text-gray-400">{p.roosterB.color} ({formatWeight(p.roosterB.weight)})</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between no-print pt-6">
                <button onClick={onBack} className="bg-gray-700 text-white py-2 px-6 rounded-lg">Atrás</button>
                <button onClick={onStartTournament} className="bg-green-600 text-white py-2 px-6 rounded-lg font-bold">Empezar Peleas</button>
            </div>
        </div>
    );
};

export default MatchmakingScreen;
