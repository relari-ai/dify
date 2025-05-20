'use client'
import type { FC } from 'react'
import { WEB_PREFIX } from '@/config'
import classNames from '@/utils/classnames'
import useTheme from '@/hooks/use-theme'

export type LogoStyle = 'default' | 'dark'

export const logoPathMap: Record<LogoStyle, string> = {
  default: '/logo/logo-color.svg',
  dark: '/logo/logo-dark.svg',
}

export type LogoSize = 'large' | 'medium' | 'small'

export const logoSizeMap: Record<LogoSize, string> = {
  large: 'w-16 h-7',
  medium: 'w-12 h-[22px]',
  small: 'w-9 h-4',
}

type NuviLogoProps = {
  style?: LogoStyle
  size?: LogoSize
  className?: string
}

const NuviLogo: FC<NuviLogoProps> = ({
  style = 'default',
  size = 'medium',
  className,
}) => {
  const { theme } = useTheme()
  const themedStyle = (theme === 'dark' && style === 'default') ? 'dark' : style

  return (
    <img
      src={`${WEB_PREFIX}${logoPathMap[themedStyle]}`}
      className={classNames('block object-contain', logoSizeMap[size], className)}
      alt='Nuvi logo'
    />
  )
}

export default NuviLogo
