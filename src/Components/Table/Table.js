import React from 'react';
import './Table.css';
import { useTranslation } from 'react-i18next';

const Table = ({ rows, columns, tfoot }) => {
  const { t } = useTranslation();
  return (
    <div className="table-container">
      <table className="table">
        <caption>{t('caption')}</caption>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {tfoot.map((tf, index) => (
              <th key={index}>{tf}</th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;