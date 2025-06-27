import WorkLink from '../components/WorkLink';
import WorkLinkEmail from '../components/WorkLinkEmail';
export default function Contacto() {
    return (
      <section className="mx-auto py-12">
       <div className='flex flex-col items-center'>
        <h1 className="text-4xl font-heading text-center mb-8">Contacto</h1>   
        <div className='flex flex-col items-center scale-[200%]'>
        <WorkLink className="scale-[200%] cursor-pointer font-heading" key=""  href="https://www.instagram.com/sevenupfresquito/">@sevenupfresquito</WorkLink>
        <WorkLink className="cursor-pointer font-heading" key=""  href="https://www.instagram.com/quesoenpolvo/">@quesoenpolvo</WorkLink>
        <WorkLink className="cursor-pointer font-heading" key=""  href="https://www.lomography.com/homes/charili/photos?order=trending">Lomography</WorkLink>
        <WorkLink className="cursor-pointer font-heading" key=""  href="https://www.linkedin.com/in/charili/">LinkedIn</WorkLink>
        <WorkLinkEmail className="cursor-pointer font-heading" key=""  href="...">Email</WorkLinkEmail>



        </div>
       </div>
      </section>
    );
  }