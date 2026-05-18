// Package core provides a gRPC client wrapper for GXQS Core WalletService.
package core

import (
	"context"
	"fmt"
	"net/url"
	"strings"

	gxqsservices "github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/corepb/services"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// Client wraps the Core WalletService gRPC client and underlying connection.
type Client struct {
	conn   *grpc.ClientConn
	wallet gxqsservices.WalletServiceClient
}

// Dial establishes a gRPC connection and returns a WalletService client wrapper.
func Dial(ctx context.Context, endpoint string, opts ...grpc.DialOption) (*Client, error) {
	target := normalizeTarget(endpoint)
	if target == "" {
		return nil, fmt.Errorf("core grpc endpoint is required")
	}
	if len(opts) == 0 {
		opts = []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	}
	conn, err := grpc.DialContext(ctx, target, opts...)
	if err != nil {
		return nil, fmt.Errorf("dial core grpc %q: %w", target, err)
	}
	return &Client{
		conn:   conn,
		wallet: gxqsservices.NewWalletServiceClient(conn),
	}, nil
}

// WalletServiceClient returns the generated WalletService gRPC client.
func (c *Client) WalletServiceClient() gxqsservices.WalletServiceClient {
	if c == nil {
		return nil
	}
	return c.wallet
}

// Close closes the underlying gRPC connection.
func (c *Client) Close() error {
	if c == nil || c.conn == nil {
		return nil
	}
	return c.conn.Close()
}

func normalizeTarget(endpoint string) string {
	trimmed := strings.TrimSpace(endpoint)
	if trimmed == "" {
		return ""
	}
	if strings.HasPrefix(trimmed, "http://") || strings.HasPrefix(trimmed, "https://") {
		if u, err := url.Parse(trimmed); err == nil && u.Host != "" {
			return u.Host
		}
	}
	return trimmed
}
