import React from 'react'
import Editor from '@monaco-editor/react'
import useThemeContext from '@theme/hooks/useThemeContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons'

import styles from './playground.module.css'

const config = {
  minimap: {
    enabled: false
  },
  lineNumbers: 'off',
  lineNumbersWidth: 1,
  fontSize: 15,
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  scrollbar: {
    vertical: 'hidden'
  },
  overviewRulerBorder: false,
  renderLineHighlight: "none",
  automaticLayout: true,
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  wrappingStrategy: 'advanced',
  overviewRulerLanes: 0
}

class Playground extends React.Component {

  constructor(props) {

    let lang, tab
    if (props.html) lang = 'html'
    if (props.css) lang = 'css'
    if (props.javascript) lang = 'javascript'
    if (props.python) lang = 'python'

    super(props)
    this.state = {
      html: props.html || '',
      css: props.css || '',
      javascript: props.javascript || '',
      python: props.python || '',
      lang,
      tab: 'console',
      logs: [],
      isShowResult: false,
      isShowButtons: false,
    }

    this.state.html = this.state.html.trim()
    this.state.css = this.state.css.trim()
    this.state.javascript = this.state.javascript.trim()
    this.state.python = this.state.python.trim()

    this.iframeRef = React.createRef()
    this.editorRef = React.createRef()
  }

  handleChange = (value) => {
    this.setState({ [this.state.lang]: value })
  }

  setLang = (lang) => {
    this.setState({ lang })
  }

  consoleLog = (text) => {
    if (typeof text === Object) text = JSON.stringify(text, null, 4)
    else text = String(text)
    const log = { content: text, type: 'text' }
    this.setState({ logs: [...this.state.logs, log] })
  }

  onerror = (error) => {
    const log = { content: error, type: 'error' }
    this.setState({ logs: [...this.state.logs, log] })
  }

  showTab = (tab) => {
    this.setState({ tab })
  }

  run = () => {

    if (this.state.lang === 'python') return this.runPython()

    const html = `${this.state.html}<style>${this.state.css}</style>`
    const iframeWindow = this.iframeRef.current.contentWindow
    iframeWindow.location.reload()
    setTimeout(() => {
      iframeWindow.document.write(html)
      iframeWindow.console.log = this.consoleLog
      iframeWindow.onerror = this.onerror
      try {
        iframeWindow.eval(this.state.javascript)
      } catch (e) {
        this.onerror(e.message)
      }

    }, 100)
    this.setState({ logs: [], isShowResult: true })
  }

  runPython = () => {
    const html = `
    <body>
      <textarea id="code">${this.state.python}</textarea>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.10.0/brython.min.js"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.10.0/brython_stdlib.js"></script>
      <script type="text/python">
        from browser import document, window 
        import tb as traceback
        try: 
            exec(document['code'].value) 
        except Exception:
            print(traceback.format_exc()) 
      </script>
      <script>brython()</script>
    </body>
    `
    const iframeWindow = this.iframeRef.current.contentWindow
    iframeWindow.location.reload()
    setTimeout(() => {
      iframeWindow.document.write(html)
      iframeWindow.console.log = this.consoleLog
      iframeWindow.onerror = this.onerror
    }, 100)
    this.setState({ logs: [], isShowResult: true })
  }

  reset = () => {
    const html = (this.props.html || '').trim()
    const css = (this.props.css || '').trim()
    const javascript = (this.props.javascript || '').trim()
    const python = (this.props.python || '').trim()
    this.setState({ html, css, javascript, python, logs: [] })
  }

  handleEditorDidMount = (editor, monaco) => {
    monaco.editor.defineTheme('my-light', {
      base: 'vs',
      inherit: true,
      rules: [{ background: 'EDF9FA' }],
      colors: {
        'editor.background': '#f6f8fa',
      }
    })
    monaco.editor.defineTheme('my-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ background: 'EDF9FA' }],
      colors: {
        'editor.background': '#282a36',
      }
    })
    monaco.editor.setTheme(this.props.isDarkTheme ? 'my-dark' : 'my-light')
    const updateHeight = () => {
      const container = this.editorRef.current
      const contentHeight = Math.min(500, editor.getContentHeight())
      container.style.height = `${contentHeight}px`
      editor.layout({ width: container.clientWidth, height: contentHeight })
    }
    editor.onDidContentSizeChange(updateHeight)

    updateHeight()
  }

  onMouseOver = () => {
    this.setState({ isShowButtons: true })
  }

  onMouseLeave = () => {
    this.setState({ isShowButtons: false }) 
  }

  render() {
    return (
      <div className={`${styles.root} ${this.props.isDarkTheme ? styles.dark : ''}`} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <div className={styles.editorWrapper} ref={this.editorRef}>
          <Editor
            language={this.state.lang}
            value={this.state[this.state.lang]}
            onChange={this.handleChange}
            options={config}
            onMount={this.handleEditorDidMount}
            theme={this.props.isDarkTheme ? 'my-dark' : 'my-light'}
          />
          { this.state.isShowButtons && (
            <div className={styles.languages}>
              {this.props.html && <span className={`${styles.btn} ${this.state.lang === 'html' && styles.active}`} onClick={() => this.setLang('html')}>HTML</span>}
              {this.props.css && <span className={`${styles.btn} ${this.state.lang === 'css' && styles.active}`} onClick={() => this.setLang('css')}>CSS</span>}
              {this.props.javascript && <span className={`${styles.btn} ${this.state.lang === 'javascript' && styles.active}`} onClick={() => this.setLang('javascript')}>JS</span>}
              <span className={styles.btn} onClick={this.run}>
                <FontAwesomeIcon icon={faPlay} />
              </span>
              <span className={styles.btn} onClick={this.reset}>
                <FontAwesomeIcon icon={faUndo} />
              </span>
            </div>
          ) }
        </div>
        <div className={`${styles.resultWrapper} ${!this.state.isShowResult && styles['d-none']}`}>
          <pre className={`${styles.console} ${this.state.tab !== 'console' && styles['d-none']}`}>
            {this.state.logs.map((log, idx) => (<span key={idx} className={`${log.type === 'error' ? styles.errorlog : styles.textlog}`}>{log.content}</span>))}
          </pre>
          <div className={this.state.tab !== 'view' && styles['d-none']}>
            <iframe className={styles.iframe} ref={this.iframeRef}></iframe>
          </div>

          <div className={styles.languages}>
            {this.props.javascript && <span className={`${styles.btn} ${this.state.tab === 'console' && styles.active}`} onClick={() => this.showTab('console')}>Console</span>}
            {this.props.html && <span className={`${styles.btn} ${this.state.tab === 'view' && styles.active}`} onClick={() => this.showTab('view')}>View</span>}
          </div>
        </div>
      </div>
    )
  }
}

export default function WrappedComponent(props) {
  const { isDarkTheme } = useThemeContext()
  return <Playground {...props} isDarkTheme={isDarkTheme} />
}