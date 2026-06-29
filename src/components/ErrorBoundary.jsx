import { Component } from 'react';
import { FaExclamationTriangle, FaRedo, FaTrashAlt } from 'react-icons/fa';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.clear();
      window.location.href = '/';
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 font-sans select-none transition-colors duration-300">
          {/* Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/5 shadow-2xl backdrop-blur-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/10 text-red-650 dark:text-red-400 text-2xl shadow-sm">
              <FaExclamationTriangle className="animate-bounce" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-display font-black text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
              An unexpected application error occurred. You can try reloading or resetting the local preferences.
            </p>

            {/* Error Message Collapse */}
            {this.state.error && (
              <div className="mb-6 text-left">
                <button
                  onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                  className="text-xs font-bold text-accent hover:underline mb-2 block border-none bg-transparent cursor-pointer"
                >
                  {this.state.showDetails ? 'Hide error details' : 'Show error details'}
                </button>
                {this.state.showDetails && (
                  <pre className="p-3.5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 text-[11px] text-gray-650 dark:text-gray-400 overflow-auto max-h-32 font-mono whitespace-pre-wrap select-text">
                    {this.state.error.toString()}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all duration-200 text-xs sm:text-sm shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 cursor-pointer border-none"
              >
                <FaRedo size={12} /> Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-650 dark:text-gray-300 hover:text-red-500 hover:border-red-500/30 dark:hover:border-red-500/20 font-bold rounded-xl transition-all duration-200 text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <FaTrashAlt size={12} /> Reset Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
