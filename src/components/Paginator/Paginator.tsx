import React from 'react';
import classes from './Paginator.module.scss';
import PaginatorNumButton from './PaginatorNumButton';
import Text from '@components/Text';
import PaginatorArrowButton from './PaginatorArrowButton';

interface PaginatorProps {
  current: number;
  total: number;
  setCurrent: (val: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ current, total, setCurrent }) => {
  return (
    <div className={classes.paginator}>
      {total < 5 ? (
        /* если меньше пяти то просто рендерим всё */
        <div className={classes.buttonContainer}>
          <PaginatorArrowButton
            type="backward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
          {Array.from({ length: total }).map((_, i) => (
            <PaginatorNumButton
              key={i + 1}
              num={i + 1}
              currNum={current}
              setCurrent={setCurrent}
            ></PaginatorNumButton>
          ))}
          <PaginatorArrowButton
            type="forward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
        </div>
      ) : current < 3 ? (
        /* если текущая страница меньше 3 то рендерим 1 2 3 ... 10 */
        <div className={classes.buttonContainer}>
          <PaginatorArrowButton
            type="backward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
          {[1, 2, 3].map((i) => (
            <PaginatorNumButton
              key={i}
              num={i}
              currNum={current}
              setCurrent={setCurrent}
            ></PaginatorNumButton>
          ))}
          <Text>. . .</Text>
          <PaginatorNumButton
            num={total}
            currNum={current}
            setCurrent={setCurrent}
          ></PaginatorNumButton>
          <PaginatorArrowButton
            type="forward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
        </div>
      ) : current > total - 3 ? (
        /* если близко к концу то 1 ... total - 3 ... total */
        <div className={classes.buttonContainer}>
          <PaginatorArrowButton
            type="backward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
          <PaginatorNumButton
            num={1}
            currNum={current}
            setCurrent={setCurrent}
          ></PaginatorNumButton>
          <Text>. . .</Text>
          {[total - 3, total - 2, total - 1, total].map((i) => (
            <PaginatorNumButton
              key={i}
              num={i}
              currNum={current}
              setCurrent={setCurrent}
            ></PaginatorNumButton>
          ))}
          <PaginatorArrowButton
            type="forward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
        </div>
      ) : (
        /* иначе 1 ... 3 4 5 ... тотал*/
        <div className={classes.buttonContainer}>
          <PaginatorArrowButton
            type="backward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
          <PaginatorNumButton
            num={1}
            currNum={current}
            setCurrent={setCurrent}
          ></PaginatorNumButton>
          <Text>. . .</Text>
          {[current - 1, current, current + 1].map((i) => (
            <PaginatorNumButton
              key={i}
              num={i}
              currNum={current}
              setCurrent={setCurrent}
            ></PaginatorNumButton>
          ))}
          <Text>. . .</Text>
          <PaginatorNumButton
            num={total}
            currNum={current}
            setCurrent={setCurrent}
          ></PaginatorNumButton>
          <PaginatorArrowButton
            type="forward"
            currNum={current}
            total={total}
            setCurrent={setCurrent}
          ></PaginatorArrowButton>
        </div>
      )}
    </div>
  );
};

export default Paginator;
