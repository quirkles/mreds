import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomButton } from 'components/buttons';
import { FormContainer } from 'components/containers';
import { CenteredGrid } from 'components/grids';
import CircularImage from 'components/images/CircularImage';
import FileInput from 'components/inputs/FileInput';
import { button_text } from 'i18n';

interface Props {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (data) => any;
  currentUrl: string;
  removeImage: () => void;
}

const ImageForm: React.FC<Props> = ({
  imageUrl,
  setImageUrl,
  onSubmit,
  currentUrl,
  removeImage,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({});

  const resetImage = useCallback(() => {
    reset();
    setImageUrl('default');
  }, [reset, setImageUrl]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid>
        <Controller
          control={control}
          name="imageFile"
          render={({ field: { name, value, onChange } }) => {
            return (
              <FileInput
                inputName={name}
                defaultValue={value}
                onChange={(event) => {
                  onChange(event.target.files[0]);
                  setImageUrl(URL.createObjectURL(event.target.files[0]));
                }}
                errors={errors.imageFile}
              />
            );
          }}
        />
        <CircularImage image={imageUrl} />
        <CustomButton type="reset" onClick={resetImage}>
          {button_text.DEFAULT}
        </CustomButton>
        <CustomButton onClick={() => setImageUrl(currentUrl)}>
          Cancel
        </CustomButton>
        <CustomButton onClick={removeImage}>Remove image</CustomButton>
      </CenteredGrid>
    </FormContainer>
  );
};

export default ImageForm;
