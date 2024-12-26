declare module '*.json' {
  const value: {
    meta: {
      title: string
      description: string
    }
    header: {
      title: string
      subtitle: string
    }
    converter: {
      dropzone: {
        title: string
        subtitle: string
        hint: string
      }
      button: {
        convert: string
        converting: string
        download: string
      }
    }
    intro: {
      title: string
      description: string
    }
    features: {
      title: string
      list: {
        free: {
          title: string
          description: string
        }
        privacy: {
          title: string
          description: string
        }
        fast: {
          title: string
          description: string
        }
        quality: {
          title: string
          description: string
        }
      }
    }
    howTo: {
      title: string
      steps: {
        "1": string
        "2": string
        "3": string
      }
    }
    faq: {
      title: string
      questions: {
        whatIsWebp: {
          question: string
          answer: string
        }
        whyConvert: {
          question: string
          answer: string
        }
        fileSize: {
          question: string
          answer: string
        }
        privacy: {
          question: string
          answer: string
        }
      }
    }
    footer: {
      copyright: string
      links: {
        privacy: string
        terms: string
        contact: string
      }
    }
  }
  export default value
} 

export type Locale = 'en' | 'zh'; 