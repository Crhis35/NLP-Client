import { ChakraProvider } from '@chakra-ui/react';
import Blog from './Blog';

const App = () => {
  return (
    <ChakraProvider>
      <Blog />
    </ChakraProvider>
  );
};

export default App;
