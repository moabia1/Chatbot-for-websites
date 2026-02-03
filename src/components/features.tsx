import React from 'react'

const Features = () => {

  const features = [
    {
      title: "Plug & Play",
      desc:"Add the chatbot to your site with a single script tag."
    },
    {
      title: "Admin Controlled",
      desc:"You control exactly what the AI knows and answers."
    },
    {
      title: "Always Online",
      desc:"Your customers get instant support 24/7."
    }
  ]
  return (
    <section id='feature' className='py-5 px-6 -mt-10'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-semibold text-center'>Why business choose AssistAI</h2>
        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
          {features.map((f,index) => (
            <div key={index} className='rounded-2xl p-8 shadow-lg border'>
              <h1 className='text-lg font-medium'>{f.title}</h1>
              <p className='mt-3 text-zinc-600 text-sm '>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features