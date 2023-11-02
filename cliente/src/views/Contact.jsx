
const Contact = () => {
  const email = 'techtrove31@gmail.com';
  const socialMediaLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/techtrove',
      logo: '../utils/images/BasicIcons/facebook.png'
    },
    {
      name: 'Instagram',
      url: 'https://www.twitter.com/techtrove',
      logo: '../utils/images/BasicIcons/instagram.png'
    },
    {
      name: 'Whatsapp',
      url: 'https://www.instagram.com/techtrove',
      logo: '../utils/images/BasicIcons/whatsapp.png'
    },
  ];

  return (
    <div className="bg-purple-200 p-4">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">Contact Us</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {socialMediaLinks.map((social, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:underline text-lg"
              >
                {social.name}
              </a>
            </div>
          ))}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <a href={`mailto:${email}`} className="text-purple-700 hover:underline text-lg">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;