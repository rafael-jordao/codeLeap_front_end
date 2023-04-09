import { useEffect } from 'react';
import { ModalBody, Overlay, ButtonWrapper } from './styles';
import { Button } from '../Button';

interface ModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ visible, onConfirm, onCancel }: ModalProps) => {

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  if (!visible) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <h1>Are you sure you want to delete this item?</h1>
        </header>
        <ButtonWrapper>
          <Button backgroundColor='transparent' border='1px solid #999999' color='black' onClick={onCancel}>Cancel</Button>
          <Button backgroundColor='#FF5151' onClick={onConfirm}>Delete</Button>
        </ButtonWrapper>
      </ModalBody>
    </Overlay>

  );
};

export default DeleteModal;
