import React from 'react';
import styles from './CustomModal.module.scss';

interface CustomModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  promocode?: boolean;
  promocodeE?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  message,
  onConfirm,
  onCancel,
  promocode,
  promocodeE,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          <div className={styles.first} onClick={onConfirm}>
            {promocode ? (promocodeE ? 'Применить' : 'Хорошо!') : 'Подтвердить'}
          </div>
          {promocode ? (
            promocodeE ? (
              <div className={styles.second} onClick={onCancel}>
                Отмена
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className={styles.second} onClick={onCancel}>
              Отмена
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
