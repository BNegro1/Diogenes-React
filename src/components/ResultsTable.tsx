import React, { useState, useEffect } from 'react';
import { IonButton, IonSpinner, IonSelect, IonSelectOption } from '@ionic/react';
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
  const [filteredRecords, setFilteredRecords] = useState<VinylRecord[]>(records);
  const [filters, setFilters] = useState({
    estado: '',
    formato: '',
    comuna: ''
  });

  // Reset filters and pagination when records change (new search)
  useEffect(() => {
    setFilters({
      estado: '',
      formato: '',
      comuna: ''
    });
    setCurrentPage(1);
    setFilteredRecords(records);
  }, [records]);

  useEffect(() => {
    setFilteredRecords(records.filter(record => {
      return (!filters.estado || record.ESTADO === filters.estado) &&
             (!filters.formato || record.FORMATO === filters.formato) &&
             (!filters.comuna || record.COMUNA === filters.comuna);
    }));
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, records]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const pages: number[] = [];
    const maxDisplayPages = window.innerWidth < 640 ? 3 : 5; // Fewer pages on mobile
    
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
    
    if (endPage - startPage + 1 < maxDisplayPages) {
      startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    setDisplayedPages(pages);
  }, [currentPage, filteredRecords.length, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const uniqueEstados = [...new Set(records.map(r => r.ESTADO))];
  const uniqueFormatos = [...new Set(records.map(r => r.FORMATO))];
  const uniqueComunas = [...new Set(records.map(r => r.COMUNA))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <IonSpinner name="circular" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center p-8 mb-20">
        <p className="text-lg text-[#404040]">
          {searchTerms 
            ? `No se encontraron resultados para "${searchTerms.artist} ${searchTerms.album}".`
            : 'No hay registros disponibles.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-20"> 
      {searchTerms && (
        <h2 className="text-xl mb-4 text-[#0a0a0a]">
          Resultados de búsqueda: {searchTerms.artist && `Artista "${searchTerms.artist}"`} 
          {searchTerms.artist && searchTerms.album && ' y '}
          {searchTerms.album && `Álbum "${searchTerms.album}"`}
        </h2>
      )}

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <IonSelect
          interface="popover"
          placeholder="Filtrar por estado"
          value={filters.estado}
          onIonChange={e => setFilters(prev => ({ ...prev, estado: e.detail.value }))}
          className="border-2 border-[#404040] rounded-lg"
        >
          <IonSelectOption value="">Todos los estados</IonSelectOption>
          {uniqueEstados.map(estado => (
            <IonSelectOption key={estado} value={estado}>{estado}</IonSelectOption>
          ))}
        </IonSelect>

        <IonSelect
          interface="popover"
          placeholder="Filtrar por formato"
          value={filters.formato}
          onIonChange={e => setFilters(prev => ({ ...prev, formato: e.detail.value }))}
          className="border-2 border-[#404040] rounded-lg"
        >
          <IonSelectOption value="">Todos los formatos</IonSelectOption>
          {uniqueFormatos.map(formato => (
            <IonSelectOption key={formato} value={formato}>{formato}</IonSelectOption>
          ))}
        </IonSelect>

        <IonSelect
          interface="popover"
          placeholder="Filtrar por comuna"
          value={filters.comuna}
          onIonChange={e => setFilters(prev => ({ ...prev, comuna: e.detail.value }))}
          className="border-2 border-[#404040] rounded-lg"
        >
          <IonSelectOption value="">Todas las comunas</IonSelectOption>
          {uniqueComunas.map(comuna => (
            <IonSelectOption key={comuna} value={comuna}>{comuna}</IonSelectOption>
          ))}
        </IonSelect>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {visibleRecords.map((record) => (
          <div key={record.CODIGO} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{record.CODIGO}</div>
              <h3 className="text-xl font-bold mb-1">{record.ARTISTA}</h3>
              <p className="text-gray-600 mb-2">{record.ALBUM}</p>
              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  <span className="text-gray-500">Formato:</span> {record.FORMATO}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Estado:</span> {record.ESTADO}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Ubicación:</span> {record.COMUNA}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">
                  ${record.PRECIO.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <div className="text-sm text-gray-600">{record.CONTACTO}</div>
              <button 
                onClick={() => window.open(`https://instagram.com/${record.CONTACTO.toLowerCase().replace(/\s+/g, '')}`, '_blank')}
                className="bg-[#404040] text-white px-4 py-2 rounded hover:bg-[#a0a0a0] transition-colors"
              >
                Ir a la tienda
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-[#404040] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#0a0a0a] text-white text-center">
              <th className="px-4 py-2">Código</th>
              <th className="px-4 py-2">Artista</th>
              <th className="px-4 py-2">Álbum</th>
              <th className="px-4 py-2">Formato</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Comuna</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Contacto</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record, index) => (
              <tr 
                key={record.CODIGO}
                className={`
                  border-b border-gray-200 hover:bg-gray-50
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                `}
              >
                <td className="px-4 py-2 text-center">{record.CODIGO}</td>
                <td className="px-4 py-2 text-center font-medium">{record.ARTISTA}</td>
                <td className="px-4 py-2 text-center">{record.ALBUM}</td>
                <td className="px-4 py-2 text-center">{record.FORMATO}</td>
                <td className="px-4 py-2 text-center">{record.ESTADO}</td>
                <td className="px-4 py-2 text-center">{record.COMUNA}</td>
                <td className="px-4 py-2 text-center font-bold">
                  ${record.PRECIO.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">{record.CONTACTO}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => window.open(`https://instagram.com/${record.CONTACTO.toLowerCase().replace(/\s+/g, '')}`, '_blank')}
                    className="bg-[#404040] text-white px-4 py-2 rounded hover:bg-[#a0a0a0] transition-colors"
                  >
                    Ir a la tienda
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRecords.length > itemsPerPage && (
        <div className="flex justify-center mt-6 gap-1 sm:gap-2 px-2 overflow-x-auto">
          <IonButton
            fill="clear"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="min-w-[40px] sm:min-w-[auto] border-2 border-[#404040]"
          >
            «
          </IonButton>
          <IonButton
            fill="clear"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="min-w-[40px] sm:min-w-[auto] border-2 border-[#404040]"
          >
            ‹
          </IonButton>
          {displayedPages.map((page) => (
            <IonButton
              key={page}
              fill={currentPage === page ? "solid" : "clear"}
              onClick={() => setCurrentPage(page)}
              className={`min-w-[40px] sm:min-w-[auto] border-2 border-[#404040] ${
                currentPage === page ? 'bg-[#ff1a1a] text-white' : ''
              }`}
            >
              {page}
            </IonButton>
          ))}
          <IonButton
            fill="clear"
            disabled={currentPage === Math.ceil(filteredRecords.length / itemsPerPage)}
            onClick={() => setCurrentPage(p => p + 1)}
            className="min-w-[40px] sm:min-w-[auto] border-2 border-[#404040]"
          >
            ›
          </IonButton>
          <IonButton
            fill="clear"
            disabled={currentPage === Math.ceil(filteredRecords.length / itemsPerPage)}
            onClick={() => setCurrentPage(Math.ceil(filteredRecords.length / itemsPerPage))}
            className="min-w-[40px] sm:min-w-[auto] border-2 border-[#404040]"
          >
            »
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;