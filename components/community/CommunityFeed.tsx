"use client";
import { useState, useEffect } from "react";
import { containsProfanity } from "@/lib/profanity";

export default function CommunityFeed({ initialQuestions }: { initialQuestions: any[] }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [cachedEmail, setCachedEmail] = useState("");
  const [cachedName, setCachedName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    setCachedEmail(localStorage.getItem("eduyatra_student_email") || "");
    setCachedName(localStorage.getItem("eduyatra_student_name") || "");
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = cachedEmail || email;
    const finalName = cachedName || name;
    if (containsProfanity(title) || containsProfanity(content)) {
      alert("Inappropriate language is prohibited.");
      return;
    }
    const res = await fetch("/api/community/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: finalName, email: finalEmail, title, content, website }),
    });
    if (res.ok) {
      localStorage.setItem("eduyatra_student_email", finalEmail);
      localStorage.setItem("eduyatra_student_name", finalName);
      setCachedEmail(finalEmail);
      setCachedName(finalName);
      setShowModal(false);
      setTitle("");
      setContent("");
      setNotice("Your question has been submitted for review. It will appear after EduYatra approves it.");
    } else {
      const result = await res.json().catch(() => null);
      alert(result?.error || "Unable to submit your question.");
    }
  };

  return (
    <div>
      {notice && (
        <div className="mb-4 rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-4 py-3 text-sm text-brand-navy" role="status">
          {notice}
        </div>
      )}

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border mb-6">
        <div>
          <h2 className="font-bold text-slate-900">Student Discussion Forum</h2>
          <p className="text-xs text-slate-500">Ask questions regarding test preparation and study abroad.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold">
          Ask Question
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form onSubmit={handlePost} className="bg-white p-6 rounded-2xl max-w-md w-full space-y-3">
            <h3 className="font-bold text-brand-navy">Post New Query</h3>
            {!cachedEmail && (
              <>
                <input placeholder="Your Name" required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                <input placeholder="Your Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              </>
            )}
            <input tabIndex={-1} aria-hidden="true" autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} className="hidden" /><input placeholder="Title / Topic" required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
            <textarea placeholder="Describe your question..." rows={3} required value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-brand-navy text-white rounded-lg text-xs font-bold">Post</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-2xl border">
            <h3 className="font-bold text-brand-navy">{q.title}</h3>
            <p className="text-xs text-slate-600 mt-1">{q.content}</p>
            {q.answers?.map((ans: any) => (
              <div key={ans.id} className="mt-3 p-3 bg-slate-50 rounded-xl text-xs">
                <span className="font-bold">{ans.name}: </span>
                <span>{ans.content}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
