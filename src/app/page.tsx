'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Token {
  id: string;
  attributes: {
    name: string;
    symbol: string;
    quantity: string;
    value: number;
    price: number;
    icon_url?: string;
  };
}

export default function Home() {
  const [address, setAddress] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api?address=${address}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tokens');
      }

      setTokens(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Token Portfolio Viewer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your wallet address to view your token holdings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'View Tokens'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {tokens.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tokens.map((token) => (
              <div
                key={token.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  {token.attributes.icon_url ? (
                    <Image
                      src={token.attributes.icon_url}
                      alt={token.attributes.symbol}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {token.attributes.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {token.attributes.symbol}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quantity: {parseFloat(token.attributes.quantity).toFixed(4)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Price: ${token.attributes.price.toFixed(2)}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Value: ${token.attributes.value.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
