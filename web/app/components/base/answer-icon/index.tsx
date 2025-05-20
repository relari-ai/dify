'use client'

import type { FC } from 'react'
import { init } from 'emoji-mart'
import data from '@emoji-mart/data'
import classNames from '@/utils/classnames'
import type { AppIconType } from '@/types/app'
import { RiSparkling2Fill } from '@remixicon/react'
import { useThemeContext } from '@/app/components/base/chat/embedded-chatbot/theme/theme-context'
import { CssTransform } from '@/app/components/base/chat/embedded-chatbot/theme/utils'

init({ data })

export type AnswerIconProps = {
  iconType?: AppIconType | null
  icon?: string | null
  background?: string | null
  imageUrl?: string | null
}

const AnswerIcon: FC<AnswerIconProps> = ({
  iconType,
  icon,
  background,
  imageUrl,
}) => {
  const themeBuilder = useThemeContext()
  const wrapperClassName = classNames(
    'flex',
    'items-center',
    'justify-center',
    'w-full',
    'h-full',
    'rounded-full',
    'border-[0.5px]',
    'border-gray-500/50',
    'text-xl',
  )
  const isValidImageIcon = iconType === 'image' && imageUrl
  return <div
    className={wrapperClassName}
    style={{ background: background || 'transparent' }}
  >
    {isValidImageIcon
      ? <img src={imageUrl} className="h-full w-full rounded-full" alt="Agent Icon" />
      : (icon && icon !== '') ? <em-emoji id={icon} /> : <RiSparkling2Fill className="text-lg" style={CssTransform(themeBuilder?.theme?.textAccentClass ?? '')}
      />
    }
  </div>
}

export default AnswerIcon
