import React, { useState, useEffect } from 'react';
import { IonButton, IonSpinner } from '@ionic/react';
import { ArrowUpDown } from 'lucide-react';
import { VinylRecord } from '../types/Record';

interface RecordTableProps {
  records: VinylRecord[];
  itemsPerPage: number;
  isLoading?: boolean;
  searchTerms?: { artist: string; album: string } | null;
}

const RecordTable: React.FC<RecordTableProps> = ({ 
  records, 
  itemsPerPage, 
  isLoading = false,
  searchTerms 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VinylRecord;
    direction: 'asc' | 'desc';
  } | null>(null);
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

  const sortRecords = (records: VinylRecord[]) => {
    if (!sortConfig) return records;

    return [...records].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key: keyof VinylRecord) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedRecords = sortRecords(records);
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleRecords = sortedRecords.slice(startIndex, startIndex + itemsPerPage);

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
        <p className="text-lg text-gray-600">
          {searchTerms 
            ? `No se encontraron resultados para "${searchTerms.artist} ${searchTerms.album}".`
            : 'No hay registros disponibles.'}
        </p>
      </div>
    );
  }

  const TableHeader: React.FC<{ label: string; field: keyof VinylRecord }> = ({ label, field }) => (
    <th 
      className="px-4 py-2 cursor-pointer hover:bg-gray-700"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center gap-2">
        {label}
        <ArrowUpDown className="h-4 w-5" />
      </div>
    </th>
  );

  const MobileCard: React.FC<{ record: VinylRecord }> = ({ record }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-2 border-[#404040]">
      <div className="grid grid-cols-1 gap-3">
        <div className="border-b-2 border-[#e0e0e0] pb-2">
          <div className="font-semibold text-[#404040]">Código</div>
          <div className="text-lg">{record.CODIGO}</div>
        </div>
        
        <div className="border-b-2 border-[#e0e0e0] pb-2">
          <div className="font-semibold text-[#404040]">Artista</div>
          <div className="text-lg">{record.ARTISTA}</div>
        </div>
        
        <div className="border-b-2 border-[#e0e0e0] pb-2">
          <div className="font-semibold text-[#404040]">Álbum</div>
          <div className="text-lg">{record.ALBUM}</div>
        </div>
        
        <div className="border-b-2 border-[#e0e0e0] pb-2">
          <div className="font-semibold text-[#404040]">Estado</div>
          <div className="text-lg">{record.ESTADO}</div>
        </div>
        
        <div className="border-b-2 border-[#e0e0e0] pb-2">
          <div className="font-semibold text-[#404040]">Precio</div>
          <div className="text-lg">${record.PRECIO.toLocaleString()}</div>
        </div>
        
        <div className="border-b-2 border-[#e0e0e0] pb-2">
          <div className="font-semibold text-[#404040]">Formato</div>
          <div className="text-lg">{record.FORMATO}</div>
        </div>
        
        <div className="border-b-2 border-[#e0e0e0] pb-2">
          <div className="font-semibold text-[#404040]">Comuna</div>
          <div className="text-lg">{record.COMUNA}</div>
        </div>
        
        <div>
          <div className="font-semibold text-[#404040]">Contacto</div>
          <div className="text-lg">
            <a href="#" className="text-[#ff1a1a] hover:text-[#990000]">
              {record.CONTACTO}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {searchTerms && (
        <h2 className="text-xl mb-4">
          Resultados de búsqueda: {searchTerms.artist && `Artista "${searchTerms.artist}"`} 
          {searchTerms.artist && searchTerms.album && ' y '}
          {searchTerms.album && `Álbum "${searchTerms.album}"`}
        </h2>
      )}

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {visibleRecords.map((record) => (
          <MobileCard key={record.CODIGO} record={record} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-[#404040] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#0a0a0a] text-white text-center">
              <TableHeader label="Código" field="CODIGO" />
              <TableHeader label="Precio" field="PRECIO" />
              <TableHeader label="Artista" field="ARTISTA" />
              <TableHeader label="Álbum" field="ALBUM" />
              <TableHeader label="Estado" field="ESTADO" />
              <TableHeader label="Formato" field="FORMATO" />
              <TableHeader label="Comuna" field="COMUNA" />
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
                <td className="px-4 py-3 border-r-2 border-[#e0e0e0]">{record.CODIGO}</td>
                <td className="px-4 py-3 border-r-2 border-[#e0e0e0]">${record.PRECIO.toLocaleString()}</td>
                <td className="px-4 py-3 border-r-2 border-[#e0e0e0]">{record.ARTISTA}</td>
                <td className="px-4 py-3 border-r-2 border-[#e0e0e0]">{record.ALBUM}</td>
                <td className="px-4 py-3 border-r-2 border-[#e0e0e0]">{record.ESTADO}</td>
                <td className="px-4 py-3 border-r-2 border-[#e0e0e0]">{record.FORMATO}</td>
                <td className="px-4 py-3 border-r-2 border-[#e0e0e0]">{record.COMUNA}</td>
                <td className="px-4 py-3">
                  <a href="#" className="text-[#ff1a1a] hover:text-[#990000]">
                    {record.CONTACTO}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {records.length > itemsPerPage && (
        <div className="flex justify-center mt-6 gap-2">
          <IonButton
            className="border-2 border-[#404040]"
            fill="clear"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            «
          </IonButton>
          <IonButton
            className="border-2 border-[#404040]"
            fill="clear"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            ‹
          </IonButton>
          {displayedPages.map((page) => (
            <IonButton
              key={page}
              className={`border-2 border-[#404040] ${currentPage === page ? 'bg-[#ff1a1a] text-white' : ''}`}
              fill={currentPage === page ? "solid" : "clear"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </IonButton>
          ))}
          <IonButton
            className="border-2 border-[#404040]"
            fill="clear"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            ›
          </IonButton>
          <IonButton
            className="border-2 border-[#404040]"
            fill="clear"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            »
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default RecordTable;