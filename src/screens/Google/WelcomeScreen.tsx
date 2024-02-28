import FormContainer from '../../components/FormContainer';

const WelcomeScreen = () => {
  return (
    <FormContainer>
      <div className="w-full max-w-sm mx-auto">
        <span className='text-4xl font-medium italic text-gray-500'>
          {/* Welcome to <br></br>Kettlebell Gear! */}
        </span>
      </div>
    </FormContainer>
  )
}

export default WelcomeScreen