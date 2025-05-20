import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { OnSend } from '../types'
import Button from '@/app/components/base/button'
import cn from '@/utils/classnames'
import { useThemeContext } from '@/app/components/base/chat/embedded-chatbot/theme/theme-context'
import { CssTransform } from '@/app/components/base/chat/embedded-chatbot/theme/utils'

type TryToAskProps = {
  suggestedQuestions: string[]
  onSend: OnSend
  isMobile?: boolean
}
const TryToAsk: FC<TryToAskProps> = ({
  suggestedQuestions,
  onSend,
  isMobile,
}) => {
  const { t } = useTranslation()
  const themeBuilder = useThemeContext()
  return (
    <div className='mb-2 py-2'>
      {/* <div className={cn('mb-2.5 flex items-center justify-between gap-2', isMobile && 'justify-end')}>
        <Divider bgStyle='gradient' className='h-px grow rotate-180' />
        <div className='system-xs-medium-uppercase shrink-0 text-text-tertiary'>{t('appDebug.feature.suggestedQuestionsAfterAnswer.tryToAsk')}</div>
        {!isMobile && <Divider bgStyle='gradient' className='h-px grow' />}
      </div> */}
      <div className={cn('flex flex-wrap justify-center', isMobile && 'justify-end')}>
        {
          suggestedQuestions.map((suggestQuestion, index) => (
            <Button
              size='medium'
              key={index}
              variant='secondary-accent'
              className='mb-1 mr-1 rounded-3xl last:mr-0'
              style={CssTransform(themeBuilder?.theme?.textAccentClass ?? '')}
              onClick={() => onSend(suggestQuestion)}
            >
              {suggestQuestion}
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default memo(TryToAsk)
