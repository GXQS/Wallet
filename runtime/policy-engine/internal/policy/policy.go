// Package policy defines and loads GXQS enterprise policy configurations.
//
// Policies are stored as YAML files and can be signed by organisation keys.
// The policy engine enforces:
//   - Mining compute limits (CPU %, GPU %, power caps)
//   - Thermal scheduling (temperature thresholds)
//   - Validator permissions (stake limits, commission bounds)
//   - Deployment authorisation (fleet tags, region restrictions)
//   - Bandwidth policies (upload/download caps)
package policy

import (
	"errors"
	"fmt"
	"os"
	"time"

	"gopkg.in/yaml.v3"
)

// Policy is the root enterprise policy document.
type Policy struct {
	APIVersion string     `yaml:"apiVersion"`
	Kind       string     `yaml:"kind"`
	Metadata   PolicyMeta `yaml:"metadata"`
	Spec       PolicySpec `yaml:"spec"`
}

// PolicyMeta holds policy metadata.
type PolicyMeta struct {
	Name        string            `yaml:"name"`
	Namespace   string            `yaml:"namespace"`
	Version     string            `yaml:"version"`
	CreatedAt   time.Time         `yaml:"createdAt"`
	Labels      map[string]string `yaml:"labels,omitempty"`
	Annotations map[string]string `yaml:"annotations,omitempty"`
}

// PolicySpec defines the enforcement rules.
type PolicySpec struct {
	Mining    MiningPolicy    `yaml:"mining"`
	Validator ValidatorPolicy `yaml:"validator"`
	Thermal   ThermalPolicy   `yaml:"thermal"`
	Bandwidth BandwidthPolicy `yaml:"bandwidth"`
	Deploy    DeployPolicy    `yaml:"deploy"`
}

// MiningPolicy limits compute resource usage.
type MiningPolicy struct {
	Enabled         bool    `yaml:"enabled"`
	MaxCPUPercent   float64 `yaml:"maxCPUPercent"`
	MaxGPUPercent   float64 `yaml:"maxGPUPercent"`
	MaxPowerWatts   float64 `yaml:"maxPowerWatts"`
	IdleOnly        bool    `yaml:"idleOnly"`
	AllowedSchedule string  `yaml:"allowedSchedule"` // cron expression
}

// ValidatorPolicy governs validator node behaviour.
type ValidatorPolicy struct {
	Enabled           bool    `yaml:"enabled"`
	MaxStakeGXQS      uint64  `yaml:"maxStakeGXQS"`
	MinCommissionRate float64 `yaml:"minCommissionRate"`
	MaxCommissionRate float64 `yaml:"maxCommissionRate"`
	RequireApproval   bool    `yaml:"requireApproval"`
}

// ThermalPolicy sets thermal management thresholds.
type ThermalPolicy struct {
	MaxCPUTempCelsius float64 `yaml:"maxCPUTempCelsius"`
	MaxGPUTempCelsius float64 `yaml:"maxGPUTempCelsius"`
	ThrottleAtPercent float64 `yaml:"throttleAtPercent"`
}

// BandwidthPolicy limits network bandwidth usage.
type BandwidthPolicy struct {
	MaxUploadMbps   float64 `yaml:"maxUploadMbps"`
	MaxDownloadMbps float64 `yaml:"maxDownloadMbps"`
}

// DeployPolicy governs deployment authorisation.
type DeployPolicy struct {
	AllowedRegions  []string `yaml:"allowedRegions"`
	RequireApproval bool     `yaml:"requireApproval"`
	MaxFleetSize    int      `yaml:"maxFleetSize"`
}

// ErrInvalidPolicy is returned when a policy fails validation.
var ErrInvalidPolicy = errors.New("invalid policy")

// LoadFile reads and parses a YAML policy file.
func LoadFile(path string) (*Policy, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read policy file %q: %w", path, err)
	}
	return Parse(data)
}

// Parse unmarshals and validates a YAML-encoded policy.
func Parse(data []byte) (*Policy, error) {
	var p Policy
	if err := yaml.Unmarshal(data, &p); err != nil {
		return nil, fmt.Errorf("unmarshal policy: %w", err)
	}
	if err := validate(&p); err != nil {
		return nil, err
	}
	return &p, nil
}

func validate(p *Policy) error {
	if p.APIVersion == "" {
		return fmt.Errorf("%w: apiVersion is required", ErrInvalidPolicy)
	}
	if p.Kind != "GXQSPolicy" {
		return fmt.Errorf("%w: kind must be GXQSPolicy, got %q", ErrInvalidPolicy, p.Kind)
	}
	if p.Metadata.Name == "" {
		return fmt.Errorf("%w: metadata.name is required", ErrInvalidPolicy)
	}
	if p.Spec.Mining.MaxCPUPercent < 0 || p.Spec.Mining.MaxCPUPercent > 100 {
		return fmt.Errorf("%w: mining.maxCPUPercent must be 0–100", ErrInvalidPolicy)
	}
	if p.Spec.Mining.MaxGPUPercent < 0 || p.Spec.Mining.MaxGPUPercent > 100 {
		return fmt.Errorf("%w: mining.maxGPUPercent must be 0–100", ErrInvalidPolicy)
	}
	if p.Spec.Validator.MinCommissionRate > p.Spec.Validator.MaxCommissionRate {
		return fmt.Errorf("%w: validator.minCommissionRate must be <= maxCommissionRate", ErrInvalidPolicy)
	}
	return nil
}
