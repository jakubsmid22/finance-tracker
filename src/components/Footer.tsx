const Footer = () => {
    const year = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {year}{" "}
            <a
              href="https://github.com/jakubsmid22"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Jakub Šmíd
            </a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  