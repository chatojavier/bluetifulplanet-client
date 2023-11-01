import { FunctionComponent } from 'react';
import InputTextArea from '@app/components/InputTextArea';
import InputText from '@app/components/InputText';
import ButtonSquare from '@app/components/ButtonSquare';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { emailPattern } from '@app/utils/general';

// eslint-disable-next-line no-shadow
enum InputLabel {
  COMMENT = 'content',
  AUTHOR = 'author',
  EMAIL = 'authorEmail',
  URL = 'authorUrl',
}

export type CommentFormOutput = {
  [key in InputLabel]: string;
};

interface CommentReplyFormProps {
  onSubmitValid: SubmitHandler<CommentFormOutput>;
  onSubmitError?: SubmitErrorHandler<CommentFormOutput>;
}

const CommentReplyForm: FunctionComponent<CommentReplyFormProps> = ({
  onSubmitValid,
  onSubmitError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormOutput>();

  const errorMessages = {
    required: 'This field should not be empty',
    email: 'The email format is wrong',
  };

  const submitValidHandler: SubmitHandler<CommentFormOutput> = async data => {
    try {
      await onSubmitValid(data);
      reset();
    } catch {
      reset();
    }
  };

  const submitErrorHandler: SubmitErrorHandler<
    CommentFormOutput
  > = async err => {
    console.log(err);
    if (onSubmitError) await onSubmitError(err);
    reset();
  };

  return (
    <form
      id="form-comment"
      onSubmit={handleSubmit(submitValidHandler, submitErrorHandler)}
      data-testid="comment-reply-form"
    >
      <p className="comment-notes text-xs">
        Your email address will not be published. Required fields are marked *
      </p>
      <div className="comment-inputs grid grid-cols-2 gap-4 mb-4">
        <InputTextArea
          {...register(InputLabel.COMMENT, {
            required: errorMessages.required,
          })}
          placeholder="Your Comment"
          rows={10}
          error={errors[InputLabel.COMMENT]?.message}
          className="col-span-2"
        />
        <InputText
          {...register(InputLabel.AUTHOR, { required: errorMessages.required })}
          placeholder="Name"
          error={errors[InputLabel.AUTHOR]?.message}
        />
        <InputText
          {...register(InputLabel.EMAIL, {
            required: errorMessages.required,
            pattern: { value: emailPattern, message: errorMessages.email },
          })}
          placeholder="Email"
          error={errors[InputLabel.EMAIL]?.message}
        />
        <InputText
          {...register(InputLabel.URL)}
          placeholder="Website"
          className="col-span-2"
        />
      </div>
      <ButtonSquare
        type="submit"
        loading={isSubmitting}
        value="Submit Comment"
      />
    </form>
  );
};

export default CommentReplyForm;
