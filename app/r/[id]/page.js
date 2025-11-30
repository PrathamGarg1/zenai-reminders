"use client"

// web fallback page 


import React, { useState, useEffect } from 'react';

const Page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/reminder/${id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('Failed to fetch reminder:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Reminder expired!</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h2>Zenai Reminders</h2>
      <p style={{ fontSize: 20 }}>{data.text}</p>
      <button
        onClick={() => window.location.href = `zenai://set-reminder?id=${id}&text=${encodeURIComponent(data.text)}&timestamp=${data.timestamp}`}
        style={{ fontSize: 24, padding: '16px 32px', marginTop: 24 }}
      >
        Set Reminder
      </button>
      <p style={{ marginTop: 16, fontSize: 14 }}>Or open in the Zenai app.</p>
    </div>
  );
};

export default Page
