import Header from "../components/Header";

function Hero() {
  return (
    <section
      id="home"
      className="py-5 text-center"
      style={{ backgroundColor: "#1a1a1a", color: "#e0e0e0" }}
    >
      <div className="container">
        <h1 className="display-4">Welcome to FinTrack Inc.</h1>
        <p className="lead">
          Empowering your financial future with innovative solutions.
        </p>
        <a href="#app" className="btn btn-primary btn-lg mt-3">
          Discover Our App
        </a>
      </div>
    </section>
  );
}

function AppSection() {
  return (
    <section
      id="app"
      className="py-5"
      style={{ backgroundColor: "#1a1a1a", color: "#e0e0e0" }}
    >
      <div className="container">
        <h2 className="text-center mb-4">Financial Tracker Application</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="img-fluid rounded"
              alt="Financial Tracker App"
            />
          </div>
          <div className="col-md-6">
            <h3>Track Your Finances with Ease</h3>
            <p>
              Our Financial Tracker app helps you manage your budget, monitor
              expenses, and plan for the future. With real-time insights and a
              user-friendly interface, staying on top of your finances has never
              been easier.
            </p>
            <ul>
              <li>Real-time expense tracking</li>
              <li>Budget planning tools</li>
              <li>Secure data encryption</li>
              <li>Customizable financial reports</li>
            </ul>
            <a href="#" className="btn btn-primary">
              Download Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, description, icon }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card h-100"
        style={{
          backgroundColor: "#2c2c2c",
          border: "1px solid #444",
          color: "#e0e0e0",
        }}
      >
        <div className="card-body text-center">
          <i className={`${icon} fa-2x mb-3`}></i>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    {
      title: "Financial Planning",
      description:
        "Tailored strategies to help you achieve your financial goals.",
      icon: "fas fa-chart-line",
    },
    {
      title: "Investment Advice",
      description: "Expert guidance to grow your wealth effectively.",
      icon: "fas fa-piggy-bank",
    },
    {
      title: "Tax Consulting",
      description: "Optimize your taxes with our professional services.",
      icon: "fas fa-calculator",
    },
  ];

  return (
    <section
      id="services"
      className="py-5"
      style={{ backgroundColor: "#1a1a1a", color: "#e0e0e0" }}
    >
      <div className="container">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="py-5"
      style={{ backgroundColor: "#1a1a1a", color: "#e0e0e0" }}
    >
      <div className="container">
        <h2 className="text-center mb-4">Get in Touch</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div
              className="card"
              style={{
                backgroundColor: "#2c2c2c",
                border: "1px solid #444",
                color: "#e0e0e0",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Contact Information</h5>
                <p>
                  <strong>Email:</strong> info@fintrack.com
                </p>
                <p>
                  <strong>Phone:</strong> (123) 456-7890
                </p>
                <p>
                  <strong>Address:</strong> 123 Finance St, Money City, FC 12345
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div
              className="card"
              style={{
                backgroundColor: "#2c2c2c",
                border: "1px solid #444",
                color: "#e0e0e0",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Reach Out</h5>
                <p>Have questions or need support? Contact us today!</p>
                <a href="mailto:info@fintrack.com" className="btn btn-primary">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="footer py-4 text-center"
      style={{ backgroundColor: "#2c2c2c", color: "#e0e0e0" }}
    >
      <div className="container">
        <p>© 2025 FinTrack Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}>
      <Header />
      <Hero />
      <AppSection />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
