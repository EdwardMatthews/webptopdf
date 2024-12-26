export interface Feature {
  title: string
  description: string
}

export interface Step {
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Translations {
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
      newFiles: string
    }
    files: {
      title: string
    }
    status: {
      completed: string
    }
  }
  features: {
    title: string
    items: Feature[]
  }
  howToUse: {
    title: string
    steps: Step[]
  }
  faq: {
    title: string
    items: FAQItem[]
  }
  footer: {
    copyright: string
  }
} 