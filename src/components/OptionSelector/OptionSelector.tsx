'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Option } from '@/shared/types'
import classes from './OptionSelector.module.scss'
import Text from '@components/Text'
import ArrowDownIcon from '../icons/ArrowDownIcon'

interface OptionSelectorProps {
    name?: string,
    options: Option[],
    selected: string,
    setSelected: (val: string) => void
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
    name = "Some selector", options, selected, setSelected
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={classes.selector__wrapper} ref={wrapperRef}>
        <Text className={classes.selector__name} view="p-20" weight="medium">
            {`${name}: `}
        </Text>
        <div className={classes.selector__container}>
          <button 
            className={classes.selector} 
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            {options.find(option => option.key === selected)?.name || selected}
          </button>
          <ArrowDownIcon color="secondary" className={classes.selector__arrow} />
          {isOpen && (
            <div className={classes.options}>
              {options.map((option) => (
                <div
                  key={option.key}
                  className={classes.option}
                  onClick={() => {
                    setSelected(option.key)
                    setIsOpen(false)
                  }}
                >
                  <Text
                    view="p-16"
                    weight="normal"
                    color={selected === option.key ? 'accent' : 'primary'}
                  >
                    {option.name}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default OptionSelector
