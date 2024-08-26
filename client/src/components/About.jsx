import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24 lg:mt-32 mt-28 font-serif font-semibold">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-orange-800 mb-6">
            About LocalLink
          </h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            LocalLink is a community-driven platform designed to bring neighbors closer together. Our mission is to foster a sense of connection and support within local communities by providing a space where members can easily share, communicate, and collaborate.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            With LocalLink, you can:
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-4">
            <li className="mb-2">Stay Informed: Get the latest updates on local events, news, and happenings in your neighborhood.</li>
            <li className="mb-2">Connect with Neighbors: Engage in discussions, share resources, and help each other out with community-driven initiatives.</li>
            <li className="mb-2">Explore Local Services: Discover local businesses, services, and opportunities right at your doorstep.</li>
            <li className="mb-2">Skills Exchange: Offer your skills or find someone to help with a task, all within your community.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Whether you're looking to attend a local event, find a reliable gardener, or simply stay in touch with your neighbors, LocalLink is here to make your community feel like home. Join LocalLink and be a part of something bigger—your local community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
