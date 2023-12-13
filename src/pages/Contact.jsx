import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleFocus = (e) => {

  }
  const handleBlur = () => {

  }
  const handleSubmit = () => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Ramanand",
        from_email: form.email,
        to_email: 'ramanandt75@gmail.com',
        messgae: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);

      setForm({ name: '', email: '', message: '' });
    })
  }



  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-14'>
          <label className='text-black-500 font-semibold' >Name
            <input type="text" name="name" className='input' 
              placeholder='Ramu'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold' >Email
            <input type="email" name="email" className='input'
              placeholder='ramanand@your-partner.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold' >Your message
            <textArea name="message" className='input'
              placeholder='Tell me about your ideas'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button className='btn' type='submit'
            disabled={isLoading}
            onFocus={handleFocus} onBlur={handleBlur}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact