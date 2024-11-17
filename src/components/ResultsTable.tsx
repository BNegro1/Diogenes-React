import React, { useState, useEffect } from 'react';
import { IonButton, IonSpinner } from '@ionic/react';
import { Instagram } from 'lucide-react';
import { VinylRecord } from '../types/Record';

interface ResultsTableProps {
  records: VinylRecord[];
  itemsPerPage: number;
  isLoading?: boolean;
  searchTerms?: { artist: string; album: string } | null;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ 
  records, 
  itemsPerPage, 
  isLoading = false,
  searchTerms 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  useEffect(() => {
    const totalPages = Math.ceil(records.length / itemsPerPage);
    const pages: number[] = [];
    const maxDisplayPages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
    
    if (endPage - startPage + 1 < maxDisplayPages) {
      startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    setDisplayedPages(pages);
  }, [currentPage, records.length, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleRecords = records.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <IonSpinner name="circular" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-[#404040]">
          {searchTerms 
            ? `No se encontraron resultados para "${searchTerms.artist} ${searchTerms.album}".`
            : 'No hay registros disponibles.'}
        </p>
      </div>
    );
  }

  const handleInstagramClick = (contacto: string) => {
    window.open(`https://instagram.com/${contacto.toLowerCase().replace(/\s+/g, '')}`, '_blank');
  };

  return (
    <div>
      {searchTerms && (
        <h2 className="text-xl mb-4 text-[#0a0a0a]">
          Resultados de búsqueda: {searchTerms.artist && `Artista "${searchTerms.artist}"`} 
          {searchTerms.artist && searchTerms.album && ' y '}
          {searchTerms.album && `Álbum "${searchTerms.album}"`}
        </h2>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-[#404040] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#0a0a0a] text-white text-center">
              <th className="px-4 py-2">Código</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Artista</th>
              <th className="px-4 py-2">Álbum</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Formato</th>
              <th className="px-4 py-2">Comuna</th>
              <th className="px-4 py-2">Contacto</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record, index) => (
              <tr 
                key={record.CODIGO}
                className={`
                  border-b-2 border-[#e0e0e0] hover:bg-[#e0e0e0] text-center
                  ${index % 2 === 0 ? 'bg-white' : 'bg-[#e0e0e0]'}
                `}
              >
                <td className="px-4 py-2 border-r-2 border-[#e0e0e0]">{record.CODIGO}</td>
                <td className="px-4 py-2 border-r-2 border-[#e0e0e0]">${record.PRECIO.toLocaleString()}</td>
                <td className="px-4 py-2 border-r-2 border-[#e0e0e0]">{record.ARTISTA}</td>
                <td className="px-4 py-2 border-r-2 border-[#e0e0e0]">{record.ALBUM}</td>
                <td className="px-4 py-2 border-r-2 border-[#e0e0e0]">{record.ESTADO}</td>
                <td className="px-4 py-2 border-r-2 border-[#e0e0e0]">{record.FORMATO}</td>
                <td className="px-4 py-2 border-r-2 border-[#e0e0e0]">{record.COMUNA}</td>
                <td className="px-4 py-2 flex items-center justify-center gap-2">
                  <span className="text-[#ff1a1a]">{record.CONTACTO}</span>
                  <button 
                    onClick={() => handleInstagramClick(record.CONTACTO)}
                    className="text-[#ff1a1a] hover:text-[#990000]"
                  >
                    <Instagram size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {records.length > itemsPerPage && (
        <div className="flex justify-center mt-4 gap-2">
          <IonButton
            fill="clear"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="border-2 border-[#404040]"
          >
            «
          </IonButton>
          <IonButton
            fill="clear"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="border-2 border-[#404040]"
          >
            ‹
          </IonButton>
          {displayedPages.map((page) => (
            <IonButton
              key={page}
              fill={currentPage === page ? "solid" : "clear"}
              onClick={() => setCurrentPage(page)}
              className={`border-2 border-[#404040] ${currentPage === page ? 'bg-[#ff1a1a] text-white' : ''}`}
            >
              {page}
            </IonButton>
          ))}
          <IonButton
            fill="clear"
            disabled={currentPage === Math.ceil(records.length / itemsPerPage)}
            onClick={() => setCurrentPage(p => p + 1)}
            className="border-2 border-[#404040]"
          >
            ›
          </IonButton>
          <IonButton
            fill="clear"
            disabled={currentPage === Math.ceil(records.length / itemsPerPage)}
            onClick={() => setCurrentPage(Math.ceil(records.length / itemsPerPage))}
            className="border-2 border-[#404040]"
          >
            »
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;