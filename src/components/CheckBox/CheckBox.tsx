import React from 'react';
import CheckIcon from '@components/icons/CheckIcon';
import classes from './CheckBox.module.scss';
import classNames from 'classnames';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, disabled, onChange, className, ...rest }) => {
  const wrapperClassName = classNames(
    classes.checkbox,
    { [classes.checkbox_disabled]: disabled },
    className
  );

  return (
    <div className={wrapperClassName}>
      {checked && (
        <div className={classes.checkbox__check}>
          <CheckIcon
            width={40}
            height={40}
          />
        </div>
      )}
      <input
        className={classes.checkbox__input}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        {...rest}
        onChange={(e) => {
          if (!disabled) onChange(e.target.checked);
        }}
      />
    </div>
  );
};

export default CheckBox;
