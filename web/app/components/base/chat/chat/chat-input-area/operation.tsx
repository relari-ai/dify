import { memo } from 'react'
import {
  RiArrowUpLine,
  RiMicLine,
} from '@remixicon/react'
import type {
  EnableType,
} from '../../types'
import type { Theme } from '../../embedded-chatbot/theme/theme-context'
import Button from '@/app/components/base/button'
import ActionButton from '@/app/components/base/action-button'
import { FileUploaderInChatInput } from '@/app/components/base/file-uploader'
import type { FileUpload } from '@/app/components/base/features/types'
import cn from '@/utils/classnames'

type OperationProps = {
  fileConfig?: FileUpload
  speechToTextConfig?: EnableType
  onShowVoiceInput?: () => void
  onSend: () => void
  theme?: Theme | null
}
const Operation = (
  {
    ref,
    fileConfig,
    speechToTextConfig,
    onShowVoiceInput,
    onSend,
    theme,
  }: OperationProps & {
    ref: React.RefObject<HTMLDivElement>;
  },
) => {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-end',
      )}
    >
      <div
        className='flex items-center pl-1'
        ref={ref}
      >
        <div className='flex items-center space-x-1'>
          {fileConfig?.enabled && <FileUploaderInChatInput fileConfig={fileConfig} />}
          {
            speechToTextConfig?.enabled && (
              <ActionButton
                size='l'
                onClick={onShowVoiceInput}
                className='border border-divider-subtle'
              >
                <RiMicLine className='h-4 w-4' />
              </ActionButton>
            )
          }
        </div>
        <Button
          className='ml-1 w-8 rounded-full px-0'
          variant='primary'
          onClick={onSend}
          style={
            theme
              ? {
                backgroundColor: theme.primaryColor,
              }
              : {}
          }
        >
          <RiArrowUpLine className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
Operation.displayName = 'Operation'

export default memo(Operation)
