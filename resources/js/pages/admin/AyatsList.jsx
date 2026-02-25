import { useEffect, useState } from "react";
import { getAyats, deleteAyat } from "@/services/ayat";
import { Link } from "react-router-dom";

export default function AyatsList() {
  const [ayats, setAyats] = useState([]);

  useEffect(() => {
    loadAyats();
  }, []);

  const loadAyats = () => {
    getAyats().then(res => setAyats(res.data.data)); // Fix: Extract data from paginated response
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ayat?')) {
      await deleteAyat(id);
      loadAyats();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Ayats</h1>
        <Link 
          to="/admin/ayats/new" 
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Add Ayat
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
              <th className="py-3 px-4 font-medium">Theme</th>
              <th className="py-3 px-4 font-medium">Reference</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {ayats.map(a => (
              <tr key={a.id} className="hover:bg-[var(--background)] transition-colors">
                <td className="py-3 px-4 text-[var(--foreground)]">
                  {a.themes && a.themes.length > 0 
                    ? a.themes.map(t => t.name).join(', ') 
                    : 'No Theme'}
                </td>
                <td className="py-3 px-4 text-[var(--muted-foreground)]">
                  Surah {a.surah}:{a.ayat}
                </td>
                <td className="py-3 px-4 text-right space-x-3">
                  <Link 
                    to={`/admin/ayats/${a.id}/edit`}
                    className="text-[var(--primary)] hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 hover:text-red-400 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {ayats.length === 0 && (
              <tr>
                <td colSpan="3" className="py-8 text-center text-[var(--muted-foreground)]">
                  No ayats found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
