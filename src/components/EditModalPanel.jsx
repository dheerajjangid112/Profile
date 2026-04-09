import { useEffect, useState } from "react";
import {
  FiGlobe,
  FiImage,
  FiLink2,
  FiLock,
  FiPlus,
  FiSave,
  FiShield,
  FiTrash2,
  FiType,
  FiUser,
  FiX,
} from "react-icons/fi";
import { verifyAdminPassword } from "../lib/adminAuth";

const EMPTY_PROFILE = {
  username: "",
  avatar: "",
  links: [],
};
const ICON_OPTIONS = ["spotify", "snapchat", "linkedin", "instagram"];

function getInitialFormData(data) {
  return {
    username: data?.username || "",
    avatar: data?.avatar || "",
    links: Array.isArray(data?.links) ? data.links : [],
  };
}

function FieldLabel({ icon: Icon, children }) {
  return (
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/75">
      <Icon size={15} className="text-emerald-50/45" />
      <span>{children}</span>
    </label>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 hover:bg-white/[0.07] focus:border-emerald-200/40 focus:bg-white/[0.08] ${className}`}
    />
  );
}

export default function EditModalPanel({
  isOpen,
  onClose,
  onSave,
  currentData,
}) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState(getInitialFormData(currentData));

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(currentData));
    }
  }, [currentData, isOpen]);

  const currentLinks = Array.isArray(formData.links) ? formData.links : [];

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const isValid = await verifyAdminPassword(password);

      if (isValid) {
        setIsAuthenticated(true);
        setPasswordError("");
        setPassword("");
      } else {
        setPasswordError("Incorrect password");
        setPassword("");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...currentLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData((prev) => ({ ...prev, links: newLinks }));
  };

  const handleAddLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [
        ...currentLinks,
        { id: Date.now(), title: "", url: "", icon: "instagram", subtitle: "" },
      ],
    }));
  };

  const handleRemoveLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: currentLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsAuthenticated(false);
    setPassword("");
    setPasswordError("");
    setFormData(EMPTY_PROFILE);
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword("");
    setPasswordError("");
    setFormData(getInitialFormData(currentData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020b09]/75 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-[#061311]/95 text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
        <div className="absolute left-8 top-0 h-24 w-24 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-8 h-24 w-24 rounded-full bg-cyan-300/15 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-50/45">
              {isAuthenticated ? "Editor unlocked" : "Secure access"}
            </p>
            <h2 className="mt-1 font-display text-2xl text-white">
              {isAuthenticated ? "Polish your profile" : "Admin access"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/80 transition-all hover:bg-white/[0.1] hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="relative max-h-[85vh] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {!isAuthenticated ? (
            <form onSubmit={handlePasswordSubmit}>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 sm:p-6">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200/25 to-cyan-200/10 text-emerald-50">
                    <FiShield size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white">
                      Unlock editor
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">
                      Enter the admin password to update your profile image and
                      links.
                    </p>
                  </div>
                </div>

                <FieldLabel icon={FiLock}>Password</FieldLabel>
                <div className="relative">
                  <FiLock
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />
                  <TextInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pl-11"
                    disabled={isVerifying}
                    autoFocus
                  />
                </div>
                {passwordError && (
                  <p className="mt-3 text-sm text-red-200">{passwordError}</p>
                )}

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-200 to-cyan-200 px-4 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[#062019] transition-all hover:brightness-105"
                >
                  {isVerifying ? "Checking..." : "Unlock editor"}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                  <div className="grid gap-4">
                    <div>
                      <FieldLabel icon={FiUser}>Username</FieldLabel>
                      <TextInput
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                      />
                    </div>

                    <div>
                      <FieldLabel icon={FiImage}>Avatar URL</FieldLabel>
                      <TextInput
                        type="url"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-50/45">
                    Preview
                  </p>
                  <div className="mt-4 flex flex-col items-center text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-cyan-200/20 p-[2px]">
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#0b1915] text-3xl text-white/40">
                        {formData.avatar ? (
                          <img
                            src={formData.avatar}
                            alt={formData.username || "Profile"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          (formData.username || "?").charAt(0).toUpperCase()
                        )}
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-xl text-white">
                      {formData.username || "Your profile"}
                    </h3>
                    <p className="mt-1 text-sm text-white/55">
                      {currentLinks.length} link
                      {currentLinks.length === 1 ? "" : "s"} ready to share
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-50/45">
                      Links
                    </p>
                    <h3 className="mt-1 font-display text-xl text-white">
                      Curate your destinations
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/80 transition-all hover:bg-white/[0.1] hover:text-white"
                  >
                    <FiPlus size={14} />
                    Add link
                  </button>
                </div>

                {currentLinks.length === 0 ? (
                  <div className="rounded-[24px] border border-dashed border-white/15 bg-[#071512]/75 px-5 py-10 text-center text-sm text-white/55">
                    No links yet. Add one to start building your profile.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentLinks.map((link, index) => (
                      <div
                        key={link.id ?? index}
                        className="rounded-[24px] border border-white/10 bg-[#071512]/82 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                              Link {index + 1}
                            </p>
                            <p className="mt-1 text-sm text-white/55">
                              Update the label, subtitle, destination, and icon.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(index)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-red-100 transition-all hover:bg-red-400/18"
                          >
                            <FiTrash2 size={13} />
                            Remove
                          </button>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <FieldLabel icon={FiType}>Title</FieldLabel>
                            <TextInput
                              type="text"
                              placeholder="Title"
                              value={link.title}
                              onChange={(e) =>
                                handleLinkChange(index, "title", e.target.value)
                              }
                            />
                          </div>

                          <div>
                            <FieldLabel icon={FiType}>Subtitle</FieldLabel>
                            <TextInput
                              type="text"
                              placeholder="Subtitle"
                              value={link.subtitle || ""}
                              onChange={(e) =>
                                handleLinkChange(
                                  index,
                                  "subtitle",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="md:col-span-2">
                            <FieldLabel icon={FiGlobe}>URL</FieldLabel>
                            <TextInput
                              type="url"
                              placeholder="https://example.com"
                              value={link.url}
                              onChange={(e) =>
                                handleLinkChange(index, "url", e.target.value)
                              }
                            />
                          </div>

                          <div className="md:max-w-[220px]">
                            <FieldLabel icon={FiLink2}>Icon</FieldLabel>
                            <select
                              value={link.icon}
                              onChange={(e) =>
                                handleLinkChange(index, "icon", e.target.value)
                              }
                              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-all hover:bg-white/[0.07] focus:border-emerald-200/40 focus:bg-white/[0.08]"
                            >
                              {ICON_OPTIONS.map((option) => (
                                <option
                                  key={option}
                                  value={option}
                                  className="bg-[#061311]"
                                >
                                  {option.charAt(0).toUpperCase() +
                                    option.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 flex gap-3 border-t border-white/10 bg-[#061311]/95 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold uppercase tracking-[0.22em] text-white/75 transition-all hover:bg-white/[0.09] hover:text-white"
                >
                  Lock
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-200 to-cyan-200 px-4 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[#062019] transition-all hover:brightness-105"
                >
                  <FiSave size={16} />
                  Save changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
