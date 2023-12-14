import React, { Suspense, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Fox from '../models/Fox';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';


const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const {alert, showAlert, hideAlert} = useAlert();


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFocus = (e) => setCurrentAnimation('walk');

  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentAnimation('hit');
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
      showAlert({show:true, text: 'Message sent successfully!'});

      setTimeout(() => {
        setCurrentAnimation('idle');
        setForm({ name: '', email: '', message: '' });
        hideAlert();
      }, 3000);
    }).catch((err) => {
      setIsLoading(false);
      setCurrentAnimation('idle');
      showAlert({show:true, text: 'Something went wrong! Try contacting on Twitter/pyaracetamol0mg', type: 'danger'});
    })
  }



  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}
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
            <textarea name="message" className='textarea' rows={4}
              placeholder='Tell me about your ideas'
              required
              value={form.message}
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
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] ">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />


          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.5, -0.7, 0]}
              scale={[0.55, 0.55, 0.55]} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact