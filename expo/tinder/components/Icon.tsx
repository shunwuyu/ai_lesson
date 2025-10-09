import React from 'react';
// @expo/vector-icons 聚合多家图标库，设计思路是提供一站式图标解决方案。
import {Ionicons} from '@expo/vector-icons';
import { IconT } from '../types';


const Icon = ({ color, name, size, style}: IconT) => (
  <Ionicons name={name} size={size} color={color} />
)

export default Icon;