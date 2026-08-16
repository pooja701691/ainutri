import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Reusable modal for confirming destructive actions (like deletion)
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone. Please confirm to proceed.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-slate-100/80 p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-6">{title}</h3>
            </div>
            {!loading && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-500 rounded-lg p-1 hover:bg-slate-50 transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
          </div>

          {/* Buttons Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-655 font-bold text-sm rounded-xl transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="w-full sm:w-auto px-6 py-2.5 bg-rose-650 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/10 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? 'Deleting...' : confirmText}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
