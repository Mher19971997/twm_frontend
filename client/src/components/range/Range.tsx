import { useState, useEffect, useRef } from 'react';
import styles from "./Range.module.scss";
import DolarIcon from '../../../public/assets/svg/DolarIcon';

interface BudgetRangeSelectorProps {
  budgetRange: string;
}

const BudgetRangeSelector: React.FC<BudgetRangeSelectorProps> = ({ budgetRange }) => {
  const [minValue, setMinValue] = useState<number>(500);
  const [maxValue, setMaxValue] = useState<number>(10000);
  const [selectedMin, setSelectedMin] = useState<string>('500');
  const [selectedMax, setSelectedMax] = useState<string>('10000');

  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sanitizedRange = budgetRange.replace(/,/g, '');
    const [min, max] = sanitizedRange.match(/\d+/g)?.map(Number) ?? [500, 10000];
    setMinValue(min);
    setMaxValue(max);
    setSelectedMin(formatWithCommas(min.toString()));
    setSelectedMax(formatWithCommas(max.toString()));
  }, [budgetRange]);

  const formatWithCommas = (value: string) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); 
    if (/^\d*$/.test(value)) { 
      if (value.length <= 6) { 
        setSelectedMin(value);
      }
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); 
    if (/^\d*$/.test(value)) { 
      if (value.length <= 6) { 
        setSelectedMax(value);
      }
    }
  };

  const handleMinBlur = () => {
    const value = Number(selectedMin.replace(/,/g, ''));
    if (isNaN(value) || value < minValue || value > Number(selectedMax.replace(/,/g, ''))) {
      setSelectedMin(formatWithCommas(minValue.toString()));
    } else {
      setSelectedMin(formatWithCommas(value.toString()));
    }
  };

  const handleMaxBlur = () => {
    const value = Number(selectedMax.replace(/,/g, ''));
    if (isNaN(value) || value < Number(selectedMin.replace(/,/g, '')) || value > maxValue) {
      setSelectedMax(formatWithCommas(maxValue.toString()));
    } else {
      setSelectedMax(formatWithCommas(value.toString()));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, isMin: boolean) => {
    if (e.key === 'Enter') {
      if (isMin) {
        const value = Number(selectedMin.replace(/,/g, ''));
        if (value >= minValue && value <= Number(selectedMax.replace(/,/g, ''))) {
          setSelectedMin(formatWithCommas(value.toString()));
        } else {
          setSelectedMin(formatWithCommas(minValue.toString()));
        }
        minInputRef.current?.blur();
      } else {
        const value = Number(selectedMax.replace(/,/g, ''));
        if (value >= Number(selectedMin.replace(/,/g, '')) && value <= maxValue) {
          setSelectedMax(formatWithCommas(value.toString()));
        } else {
          setSelectedMax(formatWithCommas(maxValue.toString()));
        }
        maxInputRef.current?.blur();
      }
    }
  };

  const updateInputWidth = (inputRef: React.RefObject<HTMLInputElement>, value: string) => {
    if (inputRef.current) {
      inputRef.current.style.width = `${value.length + 2}ch`; 
    }
  };

  useEffect(() => {
    updateInputWidth(minInputRef, selectedMin);
    updateInputWidth(maxInputRef, selectedMax);
  }, [selectedMin, selectedMax]);

  return (
    <div className={styles.range}>
      <h2>Price Range</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={`$${selectedMin}`} 
          onChange={handleMinChange}
          onBlur={handleMinBlur}
          onKeyDown={(e) => handleKeyDown(e, true)}
          inputMode="numeric"
          className={`${styles.input} ${styles.firstInput}`}
          maxLength={7}
          ref={minInputRef}
        />
        <span className={styles.dash}>-</span>
        <input
          type="text"
          value={`$${selectedMax}`} 
          onChange={handleMaxChange}
          onBlur={handleMaxBlur}
          onKeyDown={(e) => handleKeyDown(e, false)}
          inputMode="numeric"
          className={`${styles.input} ${styles.secondInput}`}
          maxLength={7}
          ref={maxInputRef}
        />
      </div>
      <DolarIcon/>
    </div>
  );
};

export default BudgetRangeSelector;
