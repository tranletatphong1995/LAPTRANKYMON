import React, { useState, useMemo } from 'react';

const hoaGiap = [
  'Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Mậu Thìn', 'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi', 'Nhâm Thân', 'Quý Dậu',
  'Giáp Tuất', 'Ất Hợi', 'Bính Tý', 'Đinh Sửu', 'Mậu Dần', 'Kỷ Mão', 'Canh Thìn', 'Tân Tỵ', 'Nhâm Ngọ', 'Quý Mùi',
  'Giáp Thân', 'Ất Dậu', 'Bính Tuất', 'Đinh Hợi', 'Mậu Tý', 'Kỷ Sửu', 'Canh Dần', 'Tân Mão', 'Nhâm Thìn', 'Quý Tỵ',
  'Giáp Ngọ', 'Ất Mùi', 'Bính Thân', 'Đinh Dậu', 'Mậu Tuất', 'Kỷ Hợi', 'Canh Tý', 'Tân Sửu', 'Nhâm Dần', 'Quý Mão',
  'Giáp Thìn', 'Ất Tỵ', 'Bính Ngọ', 'Đinh Mùi', 'Mậu Thân', 'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi', 'Nhâm Tý', 'Quý Sửu',
  'Giáp Dần', 'Ất Mão', 'Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân', 'Tân Dậu', 'Nhâm Tuất', 'Quý Hợi'
];

const luongThienXichOrder = [5, 6, 7, 8, 9, 1, 2, 3, 4];
const luongThienXichOrderReverse = [5, 4, 3, 2, 1, 9, 8, 7, 6];
const canOrder = ['Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý', 'Đinh', 'Bính', 'Ất'];

const cuuTinhMapping = {
  1: 'Thiên Bồng',
  8: 'Thiên Nhậm',
  3: 'Thiên Xung',
  4: 'Thiên Phụ',
  9: 'Thiên Anh',
  2: 'Thiên Nhuế',
  7: 'Thiên Trụ',
  6: 'Thiên Tâm',
  5: 'Thiên Cầm'
};

const KiMonDonGiap: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [selectedYinYang, setSelectedYinYang] = useState<'Âm' | 'Dương'>('Dương');

  const tuanThu = useMemo(() => {
    if (!selectedHour) return '';
    const index = hoaGiap.indexOf(selectedHour);
    if (index === -1) return '';
    let tuanThuIndex = index;
    while (tuanThuIndex % 10 !== 0) {
      tuanThuIndex--;
      if (tuanThuIndex < 0) tuanThuIndex = hoaGiap.length - 1;
    }
    return hoaGiap[tuanThuIndex];
  }, [selectedHour]);

  const trucPhu = useMemo(() => {
    if (!tuanThu) return '';
    const tuanThuCan = tuanThu.split(' ')[0];
    let flag = '';
    switch (tuanThuCan) {
      case 'Giáp':
        flag = 'Mậu';
        break;
      case 'Giáp Tuất':
        flag = 'Kỷ';
        break;
      case 'Giáp Thân':
        flag = 'Canh';
        break;
      case 'Giáp Ngọ':
        flag = 'Tân';
        break;
      case 'Giáp Thìn':
        flag = 'Nhâm';
        break;
      case 'Giáp Dần':
        flag = 'Quý';
        break;
      default:
        return '';
    }
    
    const order = selectedYinYang === 'Dương' ? luongThienXichOrder : luongThienXichOrderReverse;
    const startIndex = order.indexOf(selectedNumber);
    const flagIndex = canOrder.indexOf(flag);
    const trucPhuPosition = order[(startIndex + flagIndex) % 9];
    
    return cuuTinhMapping[trucPhuPosition as keyof typeof cuuTinhMapping];
  }, [tuanThu, selectedNumber, selectedYinYang]);

  const renderGrid = () => {
    const order = selectedYinYang === 'Dương' ? luongThienXichOrder : luongThienXichOrderReverse;
    const startIndex = order.indexOf(selectedNumber);

    return (
      <div className="grid grid-cols-3 gap-2 w-96 h-96">
        {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((num, index) => {
          const orderIndex = order.indexOf(num);
          const canIndex = (orderIndex - startIndex + 9) % 9;
          return (
            <div key={num} className="border border-gray-300 p-2 flex flex-col justify-between">
              <span className="text-gray-500 text-sm">{num}</span>
              <span className="text-right">{canOrder[canIndex]}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lập trận Kỳ Môn Độn Giáp</h2>
      <div className="mb-4">
        <label className="block mb-2">Chọn giờ:</label>
        <select
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Chọn giờ</option>
          {hoaGiap.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Chọn số cục:</label>
        <select
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Chọn Âm/Dương:</label>
        <select
          value={selectedYinYang}
          onChange={(e) => setSelectedYinYang(e.target.value as 'Âm' | 'Dương')}
          className="w-full p-2 border rounded"
        >
          <option value="Âm">Âm</option>
          <option value="Dương">Dương</option>
        </select>
      </div>
      <div className="mb-4">
        {renderGrid()}
      </div>
      <div className="mb-4">
        <p><strong>Tuần Thủ:</strong> {tuanThu}</p>
        <p><strong>Trực Phù:</strong> {trucPhu}</p>
      </div>
    </div>
  );
};

export default KiMonDonGiap;