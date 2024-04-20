
const SectionTitle = ({heading,subTitle}) => {
    return (
        <div className='mx-auto text-center md:w-4/12 my-8'>
           <p className='text-yellow-600 mb-2'>---{subTitle}---</p> 
           <h3 className='text-3xl uppercase py-4 border-y-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;