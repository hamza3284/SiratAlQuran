import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAyat, getAyat, updateAyat } from "@/services/ayat";
import { getThemes } from "@/services/theme";

export default function AyatForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const [formData, setFormData] = useState({
    surah: "",
    ayat: "",
    text_ar: "",
    text_en: "",
    themes: []
  });

  useEffect(() => {
    loadThemes();
    if (id) {
      loadAyat();
    }
  }, [id]);

  const loadThemes = async () => {
    try {
      const res = await getThemes();
      setThemes(res.data);
    } catch (error) {
      console.error("Failed to load themes", error);
    }
  };

  const loadAyat = async () => {
    try {
      setLoading(true);
      const res = await getAyat(id);
      const data = res.data;
      setFormData({
        ...data,
        themes: data.themes?.map(t => ({
          id: t.id,
          explanation: t.pivot?.explanation || ""
        })) || []
      });
    } catch (error) {
      console.error("Failed to load ayat", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateAyat(id, formData);
      } else {
        await createAyat(formData);
      }
      navigate("/admin/ayats");
    } catch (error) {
      console.error("Failed to save ayat", error);
      alert("Failed to save ayat");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = (themeId) => {
    const currentThemes = formData.themes;
    const exists = currentThemes.some(t => t.id === themeId);
    
    if (exists) {
      setFormData({ 
        ...formData, 
        themes: currentThemes.filter(t => t.id !== themeId) 
      });
    } else {
      setFormData({ 
        ...formData, 
        themes: [...currentThemes, { id: themeId, explanation: "" }] 
      });
    }
  };

  const updateThemeExplanation = (themeId, explanation) => {
    setFormData({
      ...formData,
      themes: formData.themes.map(t => 
        t.id === themeId ? { ...t, explanation } : t
      )
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
        {id ? "Edit Ayat" : "Create Ayat"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Surah Number</label>
            <input
              type="number"
              value={formData.surah}
              onChange={(e) => setFormData({ ...formData, surah: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Ayat Number</label>
            <input
              type="number"
              value={formData.ayat}
              onChange={(e) => setFormData({ ...formData, ayat: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Arabic Text</label>
          <textarea
            value={formData.text_ar}
            onChange={(e) => setFormData({ ...formData, text_ar: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent font-arabic text-xl"
            rows="4"
            dir="rtl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">English Text</label>
          <textarea
            value={formData.text_en}
            onChange={(e) => setFormData({ ...formData, text_en: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-4 text-[var(--foreground)]">Themes & Explanations</label>
          <div className="space-y-4">
            {themes.map(theme => {
              const isSelected = formData.themes.some(t => t.id === theme.id);
              const currentTheme = formData.themes.find(t => t.id === theme.id);

              return (
                <div key={theme.id} className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]">
                  <label className="flex items-center space-x-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleTheme(theme.id)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                    />
                    <span className="font-medium text-[var(--foreground)]">{theme.name}</span>
                  </label>
                  
                  {isSelected && (
                    <div className="ml-6 mt-2">
                      <label className="block text-xs font-medium mb-1 text-[var(--muted-foreground)]">
                        Context/Explanation for this theme (optional)
                      </label>
                      <textarea
                        value={currentTheme?.explanation || ""}
                        onChange={(e) => updateThemeExplanation(theme.id, e.target.value)}
                        className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        rows="2"
                        placeholder={`Explain why this verse relates to ${theme.name}...`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={() => navigate("/admin/ayats")}
            className="px-4 py-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Ayat"}
          </button>
        </div>
      </form>
    </div>
  );
}
