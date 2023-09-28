'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Registration() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  return (
    <form
      className="make-offer-form"
      onSubmit={handleSubmit(() => {
        router.push('/account');
      })}
    >
      <input {...register('businessName')} placeholder="Business Name" />
      <input {...register('businessEmail')} placeholder="Business Email" />
      <input {...register('businessPhoneNr')} placeholder="Contact Number" />
      {/* ImageUpload */}
      <input {...register('businessAdress')} placeholder="Business Adress" />
      <input type="submit" />
    </form>
  );
}