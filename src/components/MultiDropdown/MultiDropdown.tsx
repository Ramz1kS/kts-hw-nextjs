'use client';

import React, { useEffect, useRef, useState } from 'react';
import Input from '@components/Input';
import classes from './MultiDropdown.module.scss';
import classNames from 'classnames';
import Text from '@components/Text';
import ArrowDownIcon from '@components/icons/ArrowDownIcon';
import { type CategoryData } from '@shared/types';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

type DropdownOptionProps = {
  optionKey: number;
  name: string;
  selected: boolean;
  onClick: () => void;
};

const DropdownOption: React.FC<DropdownOptionProps> = ({ optionKey, name, selected, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      key={optionKey}
      className={classes.optionContainer}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={onClick}
    >
      <Text
        tag="p"
        view="p-16"
        weight="normal"
        color={selected ? 'accent' : hovered ? 'secondary' : 'primary'}
      >
        {name}
      </Text>
    </div>
  );
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: CategoryData[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: CategoryData[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: CategoryData[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: CategoryData[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = observer(
  ({ className, options, value, onChange, disabled, getTitle }) => {
    const [filter, setFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownClassName = classNames(classes.dropdownContainer, className);
    const selectedKeys = new Set(value.map((opt) => opt.id));

    const handleOptionClick = (option: CategoryData) => {
      const isSelected = selectedKeys.has(option.id);
      let newValue: CategoryData[];
      if (isSelected) {
        newValue = value.filter((item) => item.id !== option.id);
      } else {
        newValue = [...value, option];
      }
      onChange(newValue);
    };
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFilter('');
          setIsTyping(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleInputFocus = () => {
      if (!disabled) {
        setIsOpen(true);
      }
    };
    const handleInputChange = (val: string) => {
      setFilter(val);
      setIsTyping(true);
      if (!disabled) {
        setIsOpen(true);
      }
    };

    const filteredOptions = options.filter((option) =>
      option.title.toLowerCase().includes(filter.toLowerCase())
    );
    let displayValue;
    if (isTyping) {
      displayValue = filter;
    } else {
      displayValue = value.length > 0 ? getTitle(value) : '';
    }
    const placeholder = value.length === 0 ? getTitle(value) : '';
    return (
      <div className={dropdownClassName} ref={containerRef}>
        <Input
          value={displayValue}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={handleInputFocus}
          onBlur={() => {
            setIsTyping(false);
          }}
        />
        <ArrowDownIcon color="secondary" className={classes.arrowDownIcon} />

        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={classes.dropdownOptionsContainer}
          >
            {filteredOptions.map((option, index) => (
              <DropdownOption
                key={index}
                optionKey={option.id}
                name={option.title}
                selected={selectedKeys.has(option.id)}
                onClick={() => handleOptionClick(option)}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  }
);

export default MultiDropdown;
