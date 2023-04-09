import { useEffect, useState } from 'react';
import { ModalBody, Overlay, ButtonWrapper, FormContainer, Form } from './styles';
import { Button } from '../Button';
import Input from '../Input';
import TextArea from '../Textarea';

interface ModalProps {
  visible: boolean;
  onConfirm: () => void;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeParagraph: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: () => void;
  newTitle: string;
  newParagraph: string
}

function EditModal({ visible, onConfirm, onCancel, newTitle, newParagraph, onChangeTitle, onChangeParagraph }: ModalProps) {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (newTitle?.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newTitle]);


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
        <FormContainer>
          <h1>Edit</h1>
          <Form>
            <Input
              label="Title"
              type="name"
              name="title"
              onChange={onChangeTitle}
              value={newTitle}
              placeholder='John Doe'
            />
            <TextArea
              label="Content"
              name="content"
              onChange={onChangeParagraph}
              value={newParagraph}
              placeholder='Content here' />

          </Form>
        </FormContainer>

        <ButtonWrapper>
          <Button backgroundColor='transparent' border='1px solid #999999' color='black' onClick={onCancel}>Cancel</Button>
          <Button disabled={disabled} backgroundColor='#47B960' onClick={onConfirm}>Save</Button>
        </ButtonWrapper>
      </ModalBody>
    </Overlay>

  );
}

export default EditModal;
