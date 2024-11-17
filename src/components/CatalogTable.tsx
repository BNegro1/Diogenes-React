import React, { useState, useEffect } from 'react';
import { IonButton, IonSpinner, IonSelect, IonSelectOption } from '@ionic/react';
import { Instagram } from 'lucide-react';
import { VinylRecord } from '../types/Record';

interface CatalogTableProps {
  records: VinylRecord[];
  itemsPerPage: number;
  isLoading?: boolean;
}

const CatalogTable: React.FC<CatalogTableProps> = ({ 
  records, 
  itemsPerPage, 
  isLoading = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<VinylRecord[]>(records);
  const [filters, setFilters] = useState({
    estado: '',
    formato: '',
    comuna: ''
  });

  useEffect(() => {
    setFilteredRecords(records.filter(record => {
      return (!filters.estado || record.ESTADO === filters.estado) &&
             (!filters.formato || record.FORMATO === filters.formato) &&
             (!filters.comuna || record.COMUNA === filters.comuna);
    }));
  }, [filters, records]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
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

  const handleInstagramClick = (contacto: string) => {
    window.open(`https://instagram.com/${contacto.toLowerCase().replace(/\s+/g, '')}`, '_blank');
  };

  return (
    <div>
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

      {filteredRecords.length > itemsPerPage && (
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
            disabled={currentPage === Math.ceil(filteredRecords.length / itemsPerPage)}
            onClick={() => setCurrentPage(p => p + 1)}
            className="border-2 border-[#404040]"
          >
            ›
          </IonButton>
          <IonButton
            fill="clear"
            disabled={currentPage === Math.ceil(filteredRecords.length / itemsPerPage)}
            onClick={() => setCurrentPage(Math.ceil(filteredRecords.length / itemsPerPage))}
            className="border-2 border-[#404040]"
          >
            »
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default CatalogTable;