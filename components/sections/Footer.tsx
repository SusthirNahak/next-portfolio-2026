export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Susthir.dev</h3>
          <p className="text-gray-400 text-sm">
            Building high-performance web apps & scalable systems.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-white mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Web Development</li>
            <li>Shopify</li>
            <li>WordPress</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-4">Contact</h4>
          <p className="text-gray-400 text-sm">Bhubaneswar, India</p>
          <p className="text-gray-400 text-sm">susthir@gmail.com</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-12">
        © 2026 Susthir.dev — All rights reserved.
      </div>
    </footer>
  );
}
