import React, { useRef } from 'react'
import './ContactUs.css'
import emailjs from '@emailjs/browser'


export const ContactUs = () => {

   const refForm = useRef()


   const handleSubmit = (event) => {

      event.preventDefault()

      const serviceId = 'service_b37qi9n'
      const templateId = 'template_720lgdk'
      const publicKey = 'RdvqSVSetgzdpV_4D'

      emailjs.sendForm(serviceId, templateId, refForm.current, publicKey)
         .then((result) => { 
            console.log(result.text)

            refForm.current.inputUserName.value = ''
            refForm.current.inputUserEmail.value = ''
            refForm.current.inputUserMessage.value = ''

            let status = result.status

            alertSendForm(status)
         })
         .catch(error => { console.error(error) })

   }

   const alertSendForm = (status) => {
      const alert = document.getElementById('divAlert')
      alert.style.display = 'block'

      if(status === 200){
         alert.style.background = '#68ff00'
         alert.textContent = '✅ was sent successfully'
      }else {
         alert.style.background = '#ff004a'
         alert.textContent = '❌ cannot be sent at this time'
      }
      
      setTimeout(() => {
         alert.style.display = 'none'
      }, 3000);
      
   }

   return (
      <>
      <div id='divAlert'></div>
      <form ref={refForm} action="" onSubmit={handleSubmit}>

         <div>
            <h2>Contact Us</h2>
            <p>Please fill out this form</p>
         </div>

         <fieldset>
            <label htmlFor="">Name</label>
            <input id='inputUserName' name='name' type="text" placeholder='User name...' required />
         </fieldset>

         <fieldset>
            <label htmlFor="">Email</label>
            <input id='inputUserEmail' name='email' type="email" placeholder='@gmail.com...' required />
         </fieldset>

         <fieldset>
            <label htmlFor="">Message</label>
            <textarea id='inputUserMessage' name='message' type="text" placeholder='message...' required />
         </fieldset>

         <button>send</button>

      </form>
      </>
   )
}

